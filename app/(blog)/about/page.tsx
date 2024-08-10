import { Metadata } from 'next';
import markdownToHtml from '@/utils/markdown_parser';
import { DOMAIN } from '@/config/next.env';
import MarkdownContent from '@/components/base_markdown_render';
import { getMenuDetail } from '@/api/blog/menu';

export const metadata: Metadata = {
  title: '关于',
  alternates: {
    canonical: `${DOMAIN}`
  }
};

const AboutPage = async () => {
  const { data } = await getMenuDetail('about');
  const htmlContent = markdownToHtml(data?.content || '');
  return (
    <div className="content-warp box-border flex-1">
      <MarkdownContent htmlContent={htmlContent} />
    </div>
  );
};

export default AboutPage;
