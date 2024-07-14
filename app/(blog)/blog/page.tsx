import { Metadata } from 'next';

const { NEXT_PUBLIC_BASE_URL } = process.env;

export const metadata: Metadata = {
  title: '首页',
  alternates: {
    canonical: `${NEXT_PUBLIC_BASE_URL}blog`
  }
};

const BlogPage = () => {
  return (
    <div className="box-border flex-1 overflow-y-auto">
      <div className="content-warp">sssss</div>
    </div>
  );
};

export default BlogPage;
