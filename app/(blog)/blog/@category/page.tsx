import Link from 'next/link';

const categories: string[] = [
  '默认分类',
  '前端开发',
  '后端开发',
  '数据库管理',
  '移动开发',
  '人工智能AI',
  'DevOps与运维',
  '编程语言',
  '生活与感悟',
  '脚本与程序',
  '工具分享'
];

const HomeCategoryCard = () => {
  return (
    <div className="content-warp mt-6">
      <h3 className="pl-2 pt-1 mb-2 font-bold text-[0.9rem] text-text-light dark:text-text-dark">
        分类
      </h3>
      {categories.map(item => (
        <Link key={item} href={`/category/${item}`}>
          <div className="flex justify-between align-center mt-2 py-1 cursor-pointer hover:bg-secondary-light dark:hover:bg-secondary-dark rounded-sm overflow-hidden archive-transition-bg">
            <span className="inline-block pl-2 text-[0.9rem] leading-[1.6rem] text-text-light dark:text-text-dark">
              {item}
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

export default HomeCategoryCard;
