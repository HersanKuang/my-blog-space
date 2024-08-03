import { Metadata } from 'next';
import markdownToHtml from '@/utils/markdown_parser';
import { DOMAIN } from '@/config/next.env';
import MarkdownContent from '@/components/base_markdown_content';

export const metadata: Metadata = {
  title: '关于',
  alternates: {
    canonical: `${DOMAIN}`
  }
};

const AboutPage = async () => {
  const htmlContent = markdownToHtml('正在建设中...');
  return (
    <div className="content-warp box-border flex-1">
      <MarkdownContent htmlContent={htmlContent} />
    </div>
  );
};

export default AboutPage;
