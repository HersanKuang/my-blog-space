import { ResponseData } from '@/service/request';
import request from '@/service';

export const getBlogList = <T = any>(
  id: string,
  data?: Record<string, any>
): Promise<ResponseData<T>> => {
  return request.post<T>(`/blog/list/${id}`, data);
};
