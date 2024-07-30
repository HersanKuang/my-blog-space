/* eslint-disable react/no-danger */

'use client';

import { useEffect } from 'react';

interface MarkdownContentProps {
  htmlContent: string;
}

const MarkdownContent = ({ htmlContent }: MarkdownContentProps) => {
  useEffect(() => {
    const copyButtons = document.getElementsByClassName(
      'copy'
    ) as HTMLCollectionOf<HTMLButtonElement>;

    const handleCopyClick = (event: Event) => {
      const button = event.target as HTMLButtonElement;
      const codeElement = button.nextElementSibling?.nextElementSibling as HTMLElement;
      const codeText = codeElement?.innerText;

      navigator.clipboard
        .writeText(codeText)
        .then(() => {
          button.classList.add('copied');
          setTimeout(() => {
            button.classList.remove('copied');
            button.blur();
          }, 2000);
        })
        .catch(() => {});
    };

    for (let i = 0; i < copyButtons.length; i++) {
      copyButtons[i].addEventListener('click', handleCopyClick);
    }

    return () => {
      for (let i = 0; i < copyButtons.length; i++) {
        copyButtons[i].removeEventListener('click', handleCopyClick);
      }
    };
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="markdown-body" />;
};

export default MarkdownContent;
