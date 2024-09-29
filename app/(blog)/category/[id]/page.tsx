import BizBlogCard from '@/components/biz_blog_card';
import { getBlogListByCategory } from '@/api/blog/category';
import BaseEmpty from '@/components/base_empty';

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { data } = await getBlogListByCategory<CategoryListData>(params.id);
  const listData = Array.isArray(data?.list) ? data?.list : [];

  return (
    <div className="box-border flex-1">
      {listData?.length > 0 ? (
        listData.map((blog: any) => <BizBlogCard blog={blog} key={blog.id} className="mb-6" />)
      ) : (
        <BaseEmpty className="relative top-1/4" />
      )}
    </div>
  );
}
