import { Metadata } from 'next';
import markdownToHtml from '@/utils/markdown_parser';
import { DOMAIN } from '@/config/next.env';
import MarkdownContent from '@/components/base_markdown_render';
import { getBlogDetail } from '@/api/blog/home';

interface MarkdownPageProps {
  params: { id: string };
}
interface GenerateMetadata {
  params: { id: string };
}

export const dynamicParams = false;
// 设置页面的静态元数据
export async function generateMetadata({ params }: GenerateMetadata): Promise<Metadata> {
  const blogId = params.id;
  const data = await getBlogDetail<BlogDetailData>(blogId);
  return {
    title: data?.title,
    alternates: {
      canonical: `${DOMAIN}post/${blogId}`
    }
  };
}

const MarkdownPage = async ({ params }: MarkdownPageProps) => {
  const res = await getBlogDetail<BlogDetailData>(params.id);
  const htmlContent = markdownToHtml(res!.content);
  return (
    <div className="content-warp box-border flex-1">
      <MarkdownContent htmlContent={htmlContent} />
    </div>
  );
};

export default MarkdownPage;
