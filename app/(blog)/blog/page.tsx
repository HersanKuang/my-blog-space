import { Metadata } from 'next';
import * as process from 'node:process';
import { getBlogList } from '@/api/blog';
import BizBlogCard from '@/components/biz_blog_card';

const { NEXT_PUBLIC_BASE_URL, ADMIN_ID } = process.env;

export const metadata: Metadata = {
  title: '首页',
  alternates: {
    canonical: `${NEXT_PUBLIC_BASE_URL}`
  }
};

export const { data: blogListData } = await getBlogList<BlogListData>(ADMIN_ID!, {
  offset: 0,
  size: 20
});

const BlogPage = () => {
  return (
    <div className="box-border flex-1">
      {blogListData && blogListData.list.map(blog => <BizBlogCard blog={blog} key={blog.id} />)}
    </div>
  );
};

export default BlogPage;
