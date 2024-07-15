import { Metadata } from 'next';
import BizBlogContent from '@/components/biz_blog_content';

const { NEXT_PUBLIC_BASE_URL } = process.env;

export const metadata: Metadata = {
  title: '首页',
  alternates: {
    canonical: `${NEXT_PUBLIC_BASE_URL}blog`
  }
};

const BlogPage = () => {
  return (
    <div className="box-border flex-1">
      <BizBlogContent />
    </div>
  );
};

export default BlogPage;
