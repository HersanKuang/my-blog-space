/* eslint-disable react/no-danger */
import { Metadata } from 'next';
import markdownToHtml from '@/utils/markdown_parser';
import { getBlogDetail, getBlogList } from '@/api/blog';
import { _ADMIN_ID, DOMAIN } from '@/config/next.env';
import MarkdownContent from './blog_post';

interface MarkdownPageProps {
  params: { id: string };
}
interface GenerateMetadata {
  params: { id: string };
}

// 校验所有动态路由参数：id
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

// 生成静态id参数
export async function generateStaticParams() {
  const { data } = await getBlogList<BlogListData>(_ADMIN_ID!);
  return (data?.list || []).map(item => ({
    id: item.id
  }));
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
