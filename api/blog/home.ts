import { fetchData } from '@/service';

// 根据用户id获取博客列表
export async function getBlogList<T = BlogListData>(userId?: string): Promise<T> {
  const url = `/blog/list/${userId}`;
  const response = await fetchData<T>(url, {
    method: 'POST'
  });

  if (response.code !== 0) {
    throw new Error(response.message);
  }
  return response.data;
}

// 根据博客id查看博客详情
export async function getBlogDetail<T = BlogEntity>(blogId: string): Promise<T> {
  const response = await fetchData<T>(`/blog/detail/${blogId}`);
  if (response.code !== 0) {
    throw new Error(response.message);
  }
  return response.data;
}
