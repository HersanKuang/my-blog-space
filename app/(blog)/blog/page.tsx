import { Metadata } from 'next';
import BizBlogCard from '@/components/biz_blog_card';
import { DOMAIN } from '@/config/next.env';
import { blogListData } from '@/service/modules/blog_service';

export const metadata: Metadata = {
  title: '首页',
  alternates: {
    canonical: `${DOMAIN}`
  }
};

const BlogPage = () => {
  return (
    <div className="box-border flex-1">
      {blogListData && blogListData.list.map(blog => <BizBlogCard blog={blog} key={blog.id} />)}
    </div>
  );
};

export default BlogPage;
