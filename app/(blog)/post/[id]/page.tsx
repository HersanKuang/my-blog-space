import { Metadata } from 'next';
import MarkdownContent from './content';
import markdownToHtml from '@/utils/markdown_parser';
import readMdFile from '@/utils/read_md_file';
import { getBlogList } from '@/api/blog';
import { blogListData, BlogListData } from '@/app/(blog)/blog/page';

interface MarkdownPageProps {
  params: { id: string };
}

const { NEXT_PUBLIC_BASE_URL, ADMIN_ID } = process.env;

export const dynamicParams = false;
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

const MarkdownPage = ({ params }: MarkdownPageProps) => {
  const { id } = params;
  // TODO: 根据id获取后端返回的md数据
  const pageContent = (blogListData?.list || []).find(item => item.id === id);
  metadata.title = pageContent.title;
  metadata.alternates!.canonical = `${NEXT_PUBLIC_BASE_URL}post/${id}`;

  const content = markdownToHtml(readMdFile('./public/assets/md/Volta常用命令.md'));
  return (
    <div className="content-warp box-border flex-1">
      <MarkdownContent htmlContent={content} />
    </div>
  );
};

export default MarkdownPage;
