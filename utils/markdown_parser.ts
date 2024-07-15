import { marked, Renderer, Tokens } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import hljs from 'highlight.js';

// 自定义渲染器扩展
const renderer: Partial<Renderer> = {
  code({ text, lang }: Tokens.Code): string {
    // 获取语言，默认使用'plaintext'
    const language = (lang || '').trim();
    // 检查语言是否支持，如果不支持则使用'plaintext'
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    // 返回高亮后的代码
    const highlighted = hljs.highlight(text, {
      language: validLanguage,
      ignoreIllegals: true
    }).value;
    return `<pre><code class="hljs lg-${validLanguage}">${highlighted}</code></pre>`;
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

/**
 * 将Markdown字符串转换为安全的HTML字符串
 * @param markdown - 要转换的Markdown字符串
 * @returns 安全的HTML字符串
 */
function markdownToHtml(markdown: string): string {
  // 将Markdown转换为HTML
  const dirtyHtml = marked.parse(markdown) as string;
  // 使用DOMPurify清理生成的HTML，防止XSS攻击
  // 只HTML，不转化SVG和MathML
  return DOMPurify.sanitize(dirtyHtml, { USE_PROFILES: { html: true } });
}

export default markdownToHtml;
