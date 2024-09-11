import Image from 'next/image';
import Link from 'next/link';
import { getTimeDifference } from '@/utils/tools';

interface BizBlogCardProps {
  blog: BlogDetailData;
  className?: string;
}

const BizBlogCard = ({ blog, className }: BizBlogCardProps) => {
  return (
    <div className={`flex justify-between content-warp ${className}`}>
      <div className="flex flex-col flex-1 justify-between space-y-2 mr-4">
        <Link href={`/post/${blog.id}`} className="cursor-pointer">
          <h2 className="text-md line-clamp-2 font-bold text-sec-text-light dark:text-sec-text-dark">
            {blog.title}
          </h2>
        </Link>
        <div className="line-clamp-2 text-0.9 font-normal color-scheme-light">{blog.summary}</div>
        <div className="flex justify-between">
          {/* <div className="">分类</div> */}
          {/* <span>-</span> */}
          {/* <div className="">标签</div> */}
          <span />
          <div className="text-sm text-[#707070] dark:text-[#a0a0a0]">
            <span>{getTimeDifference(blog.updateAt)}</span>
          </div>
        </div>
      </div>
      <Image
        src={blog.album}
        width="0"
        height="0"
        className="w-52 h-auto max-w-full"
        sizes="100vw"
        quality={75}
        alt="album"
      />
    </div>
  );
};

export default BizBlogCard;
