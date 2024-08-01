import { Metadata } from 'next';
import markdownToHtml from '@/utils/markdown_parser';
import { getBlogDetail } from '@/api/blog';
import { DOMAIN } from '@/config/next.env';
import MarkdownContent from './blog_post';

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
  const { data } = await getBlogDetail<BlogDetailData>(blogId);
  return {
    title: data?.title,
    alternates: {
      canonical: `${DOMAIN}post/${blogId}`
    }
  };
}

const MarkdownPage = async ({ params }: MarkdownPageProps) => {
  const { id } = params;
  const { data } = await getBlogDetail<BlogDetailData>(id);

  const htmlContent = markdownToHtml(data!.content);
  return (
    <div className="content-warp box-border flex-1">
      <MarkdownContent htmlContent={htmlContent} />
    </div>
  );
};

export default MarkdownPage;
