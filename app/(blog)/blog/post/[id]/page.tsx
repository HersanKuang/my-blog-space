import MarkdownContent from './content';
import markdownToHtml from '@/utils/markdown_parser';
import readMdFile from '@/utils/read_md_file';

const MarkdownPage = () => {
  const content = markdownToHtml(readMdFile('./public/assets/md/Node服务器部署.md'));
  return (
    <div className="content-warp box-border flex-1">
      <MarkdownContent htmlContent={content} />
    </div>
  );
};

export default MarkdownPage;
