type Theme = 'dark' | 'light';

// 扩展全局 Window 接口
interface Window {
  __theme: Theme;
  __setPreferredTheme: (theme: Theme) => void;
}

// 博客详情数据
declare interface BlogDetailData {
  id: string;
  userId: string;
  title: string;
  summary: string;
  album: string;
  content: string;
  createAt: string;
  updateAt: string;
}

// 博客列表数据
declare interface BlogListData {
  list: Array<any>;
  totalCount: number;
}

// 博客导航列表
interface BlogMenuList {
  menu: string;
  path: string;
}
