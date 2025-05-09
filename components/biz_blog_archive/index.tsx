import Link from 'next/link';
import { getBlogList } from '@/api/blog/home';

interface BlogEntry {
  id: string;
  title: string;
  summary: string;
  createAt: string;
  album: string;
  total: number;
}

const BizBlogArchive = async () => {
  const blogListData = await getBlogList();
  const years = new Map<string, BlogEntry>();
  blogListData?.list.forEach(item => {
    const year = item.createAt.slice(0, 4);
    if (years.has(year)) {
      years.set(year, { ...item, total: years.get(year)!.total + 1 });
    } else {
      years.set(year, { ...item, total: 1 });
    }
  });
  return (
    <div className="content-warp mt-4">
      <h3 className="pl-2 pt-1 font-bold text-[0.9rem] text-text-light dark:text-text-dark">
        归档
      </h3>
      {Array.from(years).map(([year, { total }]) => (
        <Link key={year} href={`/archive/#${year}`}>
          <div className="flex justify-between align-center mt-2 py-1 cursor-pointer hover:bg-secondary-light dark:hover:bg-secondary-dark rounded-sm overflow-hidden archive-transition-bg">
            <span className="inline-block pl-2 text-[0.9rem] leading-[1.6rem] text-text-light dark:text-text-dark">
              {year}
            </span>
            <span className="flex align-center justify-center w-8 mr-1.5 px-[0.75rem] py-[0.1rem] text-[0.9rem] text-text-light dark:text-text-dark opacity-75 bg-secondary-light dark:bg-secondary-dark rounded-md">
              {total}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BizBlogArchive;
