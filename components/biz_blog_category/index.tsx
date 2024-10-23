import Link from 'next/link';
import classNames from 'classnames';
import { getBlogCategoryList } from '@/api/blog/category';

interface BizBlogCategoryProps {
  params?: {
    id: string;
  };
}

const BizBlogCategory = async ({ params }: BizBlogCategoryProps) => {
  const { list: listData } = await getBlogCategoryList();
  const { id } = params || {};

  return (
    <div className="content-warp mt-6">
      <h3 className="pl-2 pt-1 mb-2 font-bold text-[0.9rem] text-text-light dark:text-text-dark">
        分类
      </h3>
      {listData.map(item => (
        <Link key={item.id} href={!id ? `/category/${item.id}` : '/'}>
          <div
            className={classNames(
              'flex justify-between align-center mt-2 py-1 cursor-pointer hover:bg-secondary-light dark:hover:bg-secondary-dark rounded-sm overflow-hidden archive-transition-bg',
              { 'bg-secondary-light': item.id === id, 'dark:bg-secondary-dark': item.id === id }
            )}
          >
            <span className="inline-block pl-2 text-[0.9rem] leading-[1.6rem] text-text-light dark:text-text-dark">
              {item.name}
            </span>
            <span className="flex align-center justify-center w-8 mr-1.5 px-[0.75rem] py-[0.1rem] text-[0.9rem] text-text-light dark:text-text-dark opacity-75 bg-secondary-light dark:bg-secondary-dark rounded-md">
              {item.blogCount}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BizBlogCategory;
