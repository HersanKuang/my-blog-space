import BaseMarkdownContent from 'components/base_markdown_content';
import markdownToHtml from '@/utils/markdown_parser';
import { getMenuDetail } from '@/api/blog/menu';

const AboutPage = async () => {
  const data = await getMenuDetail('about');
  const htmlContent = markdownToHtml(data?.content || '');
  return (
    <div className="content-warp box-border flex-1">
      <BaseMarkdownContent htmlContent={htmlContent} />
    </div>
  );
};

export default AboutPage;
