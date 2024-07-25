import { Metadata } from 'next';
import markdownToHtml from '@/utils/markdown_parser';
import { getBlogDetail, getBlogList } from '@/api/blog';

interface MarkdownPageProps {
  params: { id: string };
}

const { NEXT_PUBLIC_BASE_URL, ADMIN_ID } = process.env;

// 校验所有动态路由参数：id
export const dynamicParams = false;
// 设置页面的静态元数据
export const metadata: Metadata = {
  title: '',
  alternates: {
    canonical: ''
  }
};

// 生成静态id参数
export async function generateStaticParams() {
  const { data } = await getBlogList<BlogListData>(ADMIN_ID!);
  return (data?.list || []).map(item => ({
    id: item.id
  }));
}

const MarkdownPage = async ({ params }: MarkdownPageProps) => {
  const { id } = params;
  const { data } = await getBlogDetail<BlogDetailData>(id);
  metadata.title = data?.title;
  metadata.alternates!.canonical = `${NEXT_PUBLIC_BASE_URL}post/${id}`;

  const htmlContent = markdownToHtml(data!.content);
  return (
    <div className="content-warp box-border flex-1">
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="markdown-body" />
    </div>
  );
};

export default MarkdownPage;
