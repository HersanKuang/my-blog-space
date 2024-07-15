/* eslint-disable @typescript-eslint/no-unused-vars,react/no-danger */

'use client';

import { useEffect } from 'react';
import 'highlight.js/styles/default.css';
import CopySVG from '@/public/assets/svgs/copy.svg';
import CopiedSVG from '@/public/assets/svgs/copied.svg';
import markdownToHtml from '@/utils/markdown_parser';

const markdownContent = `

# 文件权限简介

在 macOS 中，每个文件和文件夹都有一组权限，这些权限决定了哪些用户和用户组可以读取、写入或执行该文件。权限分为三类：所有者（Owner）、用户组（Group）和其他人（Others）。每类权限包含三种操作：读取（Read）、写入（Write）和执行（Execute）。

## 权限表示

权限通常以符号或八进制表示：
- 符号表示法：使用 \`r\`、\`w\` 和 \`x\` 表示读、写和执行权限。
  - 例如：\`-rwxr-xr--\`
- 八进制表示法：使用数字表示权限。
  - 例如：\`0754\`

## 符号表示法详解

每个文件权限字符串有 10 个字符：
1. 文件类型（\`-\` 表示文件，\`d\` 表示目录）
2. 所有者权限（rwx）
3. 用户组权限（rwx）
4. 其他人权限（rwx）

示例：\`-rwxr-xr--\`
- \`-\`：文件类型（普通文件）
- \`rwx\`：所有者具有读、写和执行权限
- \`r-x\`：用户组具有读和执行权限
- \`r--\`：其他人具有读权限

## 八进制表示法详解

每种权限的值：
- 读取（Read，r）：4
- 写入（Write，w）：2
- 执行（Execute，x）：1

通过将这些值相加，可以得到八进制表示：
- 所有者：读、写、执行（4+2+1=7）
- 用户组：读、执行（4+0+1=5）
- 其他人：读（4+0+0=4）

示例：\`0754\` 表示 \`-rwxr-xr--\`

## 查看文件权限

### 使用 \`ls -l\` 命令

使用 \`ls -l\` 命令查看文件和文件夹的权限：

\`\`\`sh
ls -l /path/to/file
\`\`\`

示例输出：
\`\`\`
-rwxr-xr--  1 user  group  4096 Jan  1 12:34 file.txt
\`\`\`

### 使用 \`stat\` 命令查看八进制权限

使用 \`stat\` 命令可以查看文件的八进制权限表示：

\`\`\`sh
stat -f "%A %N" /path/to/file
\`\`\`

示例：
\`\`\`sh
stat -f "%A %N" ~/Desktop/convert_to_webp.sh
\`\`\`

输出：
\`\`\`
755 /Users/hersan/Desktop/convert_to_webp.sh
\`\`\`

## 修改文件权限

使用 \`chmod (change mode)\` 命令修改文件和文件夹的权限。

### 符号表示法

\`\`\`sh
chmod u=rwx,g=rx,o=r /path/to/file
\`\`\`

\`\`\`sh
# 添加执行权限（如果目标是目录，则可进入目录内）
chmod +x /path/to/file
\`\`\`

### 八进制表示法

\`\`\`sh
chmod 754 /path/to/file
\`\`\`

## 修改文件所有者和用户组

使用 \`chown (change owner)\` 命令修改文件和文件夹的所有者和用户组。

### 修改所有者

\`\`\`sh
chown newowner /path/to/file
\`\`\`

### 修改用户组

\`\`\`sh
chown :newgroup /path/to/file
\`\`\`

### 修改所有者和用户组

\`\`\`sh
chown newowner:newgroup /path/to/file
\`\`\`

## 实际操作示例

### 创建并设置文件权限

1. 创建文件：
   \`\`\`sh
   touch ~/Desktop/example.sh
   \`\`\`

2. 查看文件权限：
   \`\`\`sh
   ls -l ~/Desktop/example.sh
   \`\`\`

3. 修改文件权限为所有者可读写执行，用户组和其他人只读：
   \`\`\`sh
   chmod 744 ~/Desktop/example.sh
   \`\`\`

4. 查看修改后的文件权限：
   \`\`\`sh
   ls -l ~/Desktop/example.sh
   \`\`\`

5. 修改文件所有者为 \`newowner\`，用户组为 \`newgroup\`：
   \`\`\`sh
   sudo chown newowner:newgroup ~/Desktop/example.sh
   \`\`\`

chmod +x 是什么意思

`;

const copySvg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(128,128,128,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2'/%3E%3C/svg%3E";

const copiedSvg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(128,128,128,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4'/%3E%3C/svg%3E";

const CopyButton = ({ preElement, copied, setCopied }: any) => {
  const handleCopy = () => {
    const codeText = preElement.querySelector('code')?.textContent || '';
    navigator.clipboard.writeText(codeText);
    setTimeout(() => {
      setCopied(preElement);
    }, 200);
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  return (
    <div
      className={`copy-button ${copied === preElement ? 'animate-scale' : ''}`}
      // className={`copy-button`}
      onClick={handleCopy}
    >
      {copied === preElement ? <CopiedSVG /> : <CopySVG />}
    </div>
  );
};

const MarkdownPage = () => {
  // const contentRef = useRef<HTMLDivElement>(null);
  // const [copied, setCopied] = useState<HTMLElement | null>(null);
  // const [preElements, setPreElements] = useState<HTMLElement[]>([]);
  const content = markdownToHtml(markdownContent);

  // useEffect(() => {
  //
  //   if (contentRef.current) {
  //     const preElements = Array.from(contentRef.current.querySelectorAll('code'));
  //     setPreElements(preElements as HTMLElement[]);
  //   }
  // }, []);

  useEffect(() => {
    // const themes = [
    //   'https://blog.hersan.cn/md/theme/notion-light-classic.css',
    //   'https://blog.hersan.cn/md/theme/vue.css',
    //   'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-light.min.css',
    //   'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-dark.min.css'
    // ];
    // let currentThemeIndex = 0;
    //
    // const toggleButton = document.getElementById('toggle-theme');
    // const themeLink = document.getElementById('theme-css') as HTMLElement;
    //
    // const toggleTheme = () => {
    //   currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    //   themeLink.setAttribute('href', themes[currentThemeIndex]);
    // };
    //
    // if (toggleButton) {
    //   // 添加事件监听器
    //   toggleButton.addEventListener('click', toggleTheme);
    // }

    // 创建一个MutationObserver实例
    const observer = new MutationObserver(() => {
      if (document.documentElement.classList.contains('dark')) {
        console.log('dark class has been added');
      } else {
        console.log('dark class has been removed');
      }
    });

    // 配置要观察的变动类型
    const config = {
      attributes: true,
      attributeFilter: ['class']
    };

    // 开始观察目标节点
    observer.observe(document.documentElement, config);

    // 清理函数，用于移除事件监听器和停止观察
    return () => {
      // if (toggleButton) {
      //   toggleButton.removeEventListener('click', toggleTheme);
      // }
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="content-warp"
      // ref={contentRef}
    >
      {/* <button */}
      {/*  id="toggle-theme" */}
      {/*  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" */}
      {/* > */}
      {/*  切换 markdown 主题 */}
      {/* </button> */}
      <div dangerouslySetInnerHTML={{ __html: content }} className="markdown-body" />
      {/* {preElements.map(pre => ( */}
      {/*  <CopyButton key={pre.className} preElement={pre} copied={copied} setCopied={setCopied} /> */}
      {/* ))} */}
    </div>
  );
};

export default MarkdownPage;
