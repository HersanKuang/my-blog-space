import Link from 'next/link';
import { categoryListData } from '@/service/modules/blog_service';

const BizBlogCategory = () => {
  const listData = categoryListData!.list;

  return (
    <div className="content-warp mt-6">
      <h3 className="pl-2 pt-1 mb-2 font-bold text-[0.9rem] text-text-light dark:text-text-dark">
        分类
      </h3>
      {listData.map(item => (
        <Link key={item.id} href={`/category/${item.id}`}>
          <div className="flex justify-between align-center mt-2 py-1 cursor-pointer hover:bg-secondary-light dark:hover:bg-secondary-dark rounded-sm overflow-hidden archive-transition-bg">
            <span className="inline-block pl-2 text-[0.9rem] leading-[1.6rem] text-text-light dark:text-text-dark">
              {item.name}
            </span>
            <span className="flex align-center mr-2 justify-center px-[0.75rem] py-[0.1rem] text-[0.9rem] text-text-light dark:text-text-dark opacity-75 bg-secondary-light dark:bg-secondary-dark rounded-md">
              0
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BizBlogCategory;
