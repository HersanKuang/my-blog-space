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
