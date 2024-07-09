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
    <div className="flex flex-col md:flex-row md:justify-between w-full max-w-7xl mx-auto sm:px-10 lg:px-12">
      {/* Main Content Area */}
      <div className="flex-1 bg-primary-light dark:bg-primary-dark p-4 shadow-lg rounded-lg mb-4 md:mb-0 h-64">
        <h2 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark">
          Next.js + tailwindcss实现深色模式及控制器
        </h2>
        <p className="text-text-light dark:text-text-dark">2024-07-06 - 代码分享</p>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-text-light dark:text-text-dark">
          三种方法在中国网络环境下使用Docker
        </h3>
        <p className="text-text-light dark:text-text-dark">
          相信大家最近都遇到过在服务器，或者在一些我们没有办法连接外网的情况下无法拉取docker镜像。这里介绍三种方法帮你解决
        </p>
      </div>
      {/* Sidebar */}
    </div>
  );
};

export default BlogPage;
