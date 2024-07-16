'use client';

import { useEffect } from 'react';
import 'highlight.js/styles/default.css';
import markdownToHtml from '@/utils/markdown_parser';
import markdownContent from '@/mock/markdown_content';

const MarkdownPage = () => {
  const content = markdownToHtml(markdownContent);

  const changeStyleSheet = (theme: any) => {
    let linkElement = document.getElementById('theme-style') as HTMLLinkElement;
    if (!linkElement) {
      // 创建 link 元素
      linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.id = 'theme-style';
      document.head.appendChild(linkElement);
    }
    linkElement.href = `/assets/css/github-markdown-${theme}.css`;
  };

  useEffect(() => {
    const htmlElement = document.documentElement;

    // 创建 MutationObserver 实例
    const observer = new MutationObserver(mutationsList => {
      // eslint-disable-next-line no-restricted-syntax
      for (const mutation of mutationsList) {
        if (mutation.attributeName === 'class') {
          // 检查是否包含 'dark' class
          if (htmlElement.classList.contains('dark')) {
            // 切换到 dark.css
            changeStyleSheet('dark');
          } else {
            // 切换到 light.css
            changeStyleSheet('light');
          }
        }
      }
    });

    // 配置 MutationObserver 监听的目标和选项
    observer.observe(htmlElement, {
      attributes: true
    });

    // 初始样式表加载
    if (htmlElement.classList.contains('dark')) {
      changeStyleSheet('dark');
    } else {
      changeStyleSheet('light');
    }

    return () => {
      // 清除 observer
      observer.disconnect();
    };
  }, []);

  return (
    <div className="content-warp box-border flex-1">
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: content }} className="markdown-body" />
    </div>
  );
};

export default MarkdownPage;
