import { ResponseData } from '@/service/request';
import request from '@/service';

// 根据用户id获取博客的菜单
export const getBlogMenuList = <T = any>(id: string): Promise<ResponseData<T>> => {
  return request.get<T>(`/blog/menu/list/${id}`);
};

// 根据菜单code获取详情
export const getMenuDetail = <T = any>(code: string): Promise<ResponseData<T>> => {
  return request.get<T>(`/blog/menu/detail/${code}`);
};
