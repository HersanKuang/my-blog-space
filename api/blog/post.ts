import { ResponseData } from '@/service/request';
import { request } from '@/service';

// 验证文章id
export const getPostById = <T = string | null>(postId: string): Promise<ResponseData<T>> => {
  return request.get<T>(`/blog/posts/${postId}`);
};
