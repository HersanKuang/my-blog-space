import request from '@/service';
import { ResponseData } from '@/service/request';

// 根据用户id获取博客的分类列表
export const getBlogCategoryList = <T = any>(id: string): Promise<ResponseData<T>> => {
  return request.get<T>(`/blog/category/list/${id}`);
};
