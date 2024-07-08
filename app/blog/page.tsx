import { Metadata } from 'next';

const { NEXT_PUBLIC_BASE_URL } = process.env;

export const metadata: Metadata = {
  title: '首页',
  alternates: {
    canonical: `${NEXT_PUBLIC_BASE_URL}blog`
  }
};

const BlogPage = () => {
  return <>BlogPage</>;
};

export default BlogPage;
