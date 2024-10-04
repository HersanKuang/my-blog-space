import { fetchData } from '@/service';
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
export async function getMenuDetail<T = any>(code: string): Promise<T> {
  const url = `/blog/menu/detail/${code}`;
  const response = await fetchData<T>(url);
  if (response.code !== 0) {
    throw new Error(response.message);
  }
  return response.data;
}
