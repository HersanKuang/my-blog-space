import crypto from 'crypto';
import { LRUCache } from 'lru-cache';
import { marked, Renderer, Tokens } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { createHighlighterCore } from 'shiki/core';
import getWasm from 'shiki/wasm';

const highlighter = await createHighlighterCore({
  themes: [import('shiki/themes/one-light.mjs'), import('shiki/themes/one-dark-pro.mjs')],
  langs: [
    import('shiki/langs/typescript.mjs'),
    import('shiki/langs/javascript.mjs'),
    import('shiki/langs/tsx.mjs'),
    import('shiki/langs/jsx.mjs'),
    import('shiki/langs/sh.mjs'),
    import('shiki/langs/bash.mjs'),
    import('shiki/langs/json.mjs'),
    import('shiki/langs/cmd.mjs'),
    import('shiki/langs/css.mjs'),
    import('shiki/langs/docker.mjs'),
    import('shiki/langs/git-commit.mjs'),
    import('shiki/langs/html.mjs'),
    import('shiki/langs/http.mjs'),
    import('shiki/langs/java.mjs'),
    import('shiki/langs/less.mjs'),
    import('shiki/langs/markdown.mjs'),
    import('shiki/langs/md.mjs'),
    import('shiki/langs/nginx.mjs'),
    import('shiki/langs/regexp.mjs'),
    import('shiki/langs/py.mjs'),
    import('shiki/langs/python.mjs'),
    import('shiki/langs/sass.mjs'),
    import('shiki/langs/scss.mjs'),
    import('shiki/langs/shell.mjs'),
    import('shiki/langs/sql.mjs'),
    import('shiki/langs/zsh.mjs'),
    import('shiki/langs/vue.mjs'),
    import('shiki/langs/ts.mjs')
  ],
  loadWasm: getWasm
});

// 自定义渲染器
const renderer: Partial<Renderer> = {
  code({ text, lang }: Tokens.Code): string {
    // 获取语言，默认使用'plaintext'
    let language = (lang || '').trim();
    // 对shiki内部没有支持的语法转化
    if (language === 'react') language = 'tsx';
    else if (language === 'mysql') language = 'sql';
    else if (language === 'ejs') language = 'js';
    else if (language === 'env') language = 'plaintext';
    // 使用 shiki 生成高亮代码的 HTML，在 node 上运行建议用 codeToHtml
    const highlightedCode = highlighter.codeToHtml(text, {
      lang: language,
      themes: {
        light: 'one-light',
        dark: 'one-dark-pro'
      }
    });
    return `
      <div class="language-${language}">
        <button title="Copy Code" class="copy"></button>
        <span class="lang">${language}</span>
        ${highlightedCode}
      </div>
    `;
  },
  codespan({ text }: Tokens.Codespan): string {
    return `<code class="codespan">${text}</code>`;
  }
};

marked.use({
  // 注册自定义渲染器
  useNewRenderer: true,
  renderer,
  // 启用GitHub Flavored Markdown
  gfm: true,
  // 将换行符转换为<br>标签
  breaks: true,
  // 关闭异步的转化
  async: false
});

const htmlCache = new LRUCache<string, string>({ max: 500 });

function getCacheKey(markdown: string): string {
  return crypto.createHash('sha256').update(markdown).digest('hex');
}

/**
 * 将Markdown字符串转换为安全的HTML字符串
 * @param markdown - 要转换的Markdown字符串
 * @returns 安全的HTML字符串
 */
function markdownToHtml(markdown: string): string {
  const cacheKey = getCacheKey(markdown);
  const cachedHtml = htmlCache.get(cacheKey);

  if (cachedHtml) {
    return cachedHtml;
  }

  const dirtyHtml = <string>marked.parse(markdown);
  // 使用DOMPurify清理生成的HTML，防止XSS攻击
  // 只HTML，不转化SVG和MathML
  const cleanHtml = DOMPurify.sanitize(dirtyHtml, { USE_PROFILES: { html: true } });

  htmlCache.set(cacheKey, cleanHtml);
  return cleanHtml;
}

export default markdownToHtml;
