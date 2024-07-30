import { Metadata } from 'next';
import { getBlogList } from '@/api/blog';
import BizBlogCard from '@/components/biz_blog_card';
import { _ADMIN_ID, DOMAIN } from '@/config/next.env';

export const metadata: Metadata = {
  title: '首页',
  alternates: {
    canonical: `${DOMAIN}`
  }
};

export const { data: blogListData } = await getBlogList<BlogListData>(_ADMIN_ID!, {
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
