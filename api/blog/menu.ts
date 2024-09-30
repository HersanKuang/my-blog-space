import { ResponseData } from '@/service/request';
import { request, fetchData } from '@/service';
import { _ADMIN_ID } from '@/config/next.env';

// 根据用户id获取博客的菜单
export async function getBlogMenuList<T = BlogMenuList[]>(): Promise<T> {
  const url = `/blog/menu/list/${_ADMIN_ID}`;
  const response = await fetchData<T>(url);
  if (response.code !== 0) {
    throw new Error(response.message);
  }
  return response.data;
}

// 根据菜单code获取详情
export const getMenuDetail = <T = any>(code: string): Promise<ResponseData<T>> => {
  return request.get<T>(`/blog/menu/detail/${code}`);
};
