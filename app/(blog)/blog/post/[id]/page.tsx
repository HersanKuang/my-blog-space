import { Metadata } from 'next';
import MarkdownContent from './content';
import markdownToHtml from '@/utils/markdown_parser';
import readMdFile from '@/utils/read_md_file';

const { NEXT_PUBLIC_BASE_URL } = process.env;

export const metadata: Metadata = {
  title: '首页',
  alternates: {
    canonical: `${NEXT_PUBLIC_BASE_URL}blog`
  }
};

const MarkdownPage = () => {
  const content = markdownToHtml(readMdFile('./public/assets/md/Volta常用命令.md'));
  return (
    <div className="content-warp box-border flex-1">
      <MarkdownContent htmlContent={content} />
    </div>
  );
};

export default MarkdownPage;
