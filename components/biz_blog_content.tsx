import Image from 'next/image';
import Link from 'next/link';
import * as process from 'node:process';
import { getBlogList } from '@/api/blog';

interface BlogListData {
  list: Array<any>;
  totalCount: number;
}

const { ADMIN_ID: userId } = process.env;

export const { data: blogListData } = await getBlogList<BlogListData>(userId!, {
  offset: 0,
  size: 20
});

const BizBlogContent = () => {
  return (
    blogListData &&
    blogListData.list.map(blog => (
      <div key={blog.id} className="flex justify-between content-warp">
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
            <div className="text-sm text-[#606060] dark:text-[#b0b0b0]">{blog.createAt}</div>
          </div>
        </div>
        <Image src={blog.ablum} width="200" height="128" quality={100} alt="cover" />
      </div>
    ))
  );
};

export default BizBlogContent;
