'use server';

import * as fs from 'fs';
import * as path from 'path';

/**
 * 读取 Markdown 文件内容
 * @param {string} filePath - Markdown 文件的路径
 * @returns {string} 文件内容
 */
function readMdFile(filePath: string): string {
  try {
    const absolutePath = path.resolve(filePath);
    const data = fs.readFileSync(absolutePath, 'utf-8');
    return data;
  } catch (error) {
    console.error(`读取文件失败: ${(error as Error).message}`);
    throw error;
  }
}

export default readMdFile;
