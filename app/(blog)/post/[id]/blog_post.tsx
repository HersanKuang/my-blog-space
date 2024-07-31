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

      // 判断是否 https 模式下，使用 navigator.clipboard
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(codeText)
          .then(() => {
            button.classList.add('copied');
            setTimeout(() => {
              button.classList.remove('copied');
              button.blur();
            }, 2000);
          })
          .catch(err => {
            console.error('Unable to copy using navigator.clipboard', err);
          });
      } else {
        // 否则使用废弃的 document.execCommand API
        const textArea = document.createElement('textarea');
        textArea.value = codeText;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          button.classList.add('copied');
          setTimeout(() => {
            button.classList.remove('copied');
            button.blur();
          }, 2000);
        } catch (err) {
          console.error('Unable to copy using document.execCommand', err);
        }
        document.body.removeChild(textArea);
      }
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
