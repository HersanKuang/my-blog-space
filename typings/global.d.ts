type Theme = 'dark' | 'light';

// 扩展全局 Window 接口
interface Window {
  __theme: Theme;
  __setPreferredTheme: (theme: Theme) => void;
}

declare interface BlogDetailData {
  id: string;
  userId: string;
  title: string;
  summary: string;
  album: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

declare interface BlogListData {
  list: Array<any>;
  totalCount: number;
}
