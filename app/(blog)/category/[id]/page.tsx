import BizBlogCard from '@/components/biz_blog_card';
import { blogListData } from '@/service/modules/blog_service';

export default function CategoryPage() {
  return (
    <div className="box-border flex-1">
      {blogListData &&
        blogListData.list.map(blog => <BizBlogCard blog={blog} key={blog.id} className="mb-6" />)}
    </div>
  );
}
