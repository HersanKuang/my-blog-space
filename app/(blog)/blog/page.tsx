import { Metadata } from 'next';
import BizBlogCard from '@/components/biz_blog_card';
import { DOMAIN } from '@/config/next.env';
import { getBlogList } from '@/api/blog/home';

export const metadata: Metadata = {
  title: '首页',
  alternates: {
    canonical: `${DOMAIN}`
  }
};

const BlogPage = async () => {
  const blogListData = await getBlogList();
  return (
    <div className="box-border flex-1">
      {blogListData &&
        blogListData.list.map(blog => <BizBlogCard key={blog.id} blog={blog} className="mb-6" />)}
    </div>
  );
};

export default BlogPage;
