import { Metadata } from 'next';
import BizBlogCard from '@/components/biz_blog_card';
import { DOMAIN } from '@/config/next.env';
import { getBlogList } from '@/api/blog/home';
import BaseEmpty from '@/components/base_empty';

export const metadata: Metadata = {
  title: '首页',
  alternates: {
    canonical: `${DOMAIN}`
  }
};

const BlogPage = async () => {
  const { list } = await getBlogList();
  const dataList = list.filter(item => item.private === 0);
  return (
    <div className="box-border flex-1">
      {dataList.length > 0 ? (
        dataList.map(blog => <BizBlogCard key={blog.id} blog={blog} className="mb-6" />)
      ) : (
        <BaseEmpty className="relative top-1/4" />
      )}
    </div>
  );
};

export default BlogPage;
