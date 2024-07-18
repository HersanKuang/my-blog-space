'use client';

import 'highlight.js/styles/atom-one-dark.css';
import '@/public/assets/css/github-markdown-light.css';

const MarkdownContent = ({ content }: any) => {
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: content }} className="markdown-body" />;
};

export default MarkdownContent;
