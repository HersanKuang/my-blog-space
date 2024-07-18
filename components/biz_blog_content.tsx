import Image from 'next/image';
import Link from 'next/link';
import { mockArticleData } from '@/mock';

const BizBlogContent = () => {
  return (
    <div className="flex justify-between content-warp">
      <div className="flex flex-col flex-1 justify-between space-y-2 mr-4">
        <Link href="/post/572839401826453617" className="cursor-pointer">
          <h2 className="text-md line-clamp-2 font-bold text-sec-text-light dark:text-sec-text-dark">
            {mockArticleData.data.title}
          </h2>
        </Link>
        <div className="line-clamp-2 text-0.9 font-normal color-scheme-light">
          {mockArticleData.data.description}
        </div>
        <div className="flex justify-between">
          {/* <div className="">分类</div> */}
          {/* <span>-</span> */}
          {/* <div className="">标签</div> */}
          <span />
          <div className="text-sec-text-light dark:text-sec-text-dark text-opacity-50 dark:text-opacity-50">
            {mockArticleData.data.createTime}
          </div>
        </div>
      </div>
      <Image src={mockArticleData.data.cover} width="200" height="100" alt="cover" />
    </div>
  );
};

export default BizBlogContent;
