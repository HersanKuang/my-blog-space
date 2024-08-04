import { ResponseData } from '@/service/request';
import request from '@/service';

// 根据用户id获取博客列表
export const getBlogList = <T = any>(
  id: string,
  data?: Record<string, any>
): Promise<ResponseData<T>> => {
  return request.post<T>(`/blog/list/${id}`, data);
};

// 根据博客id查看博客详情
export const getBlogDetail = <T = BlogDetailData>(blogId: string): Promise<ResponseData<T>> => {
  return request.get(`/blog/detail/${blogId}`);
};
