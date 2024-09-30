import { request, fetchData } from '@/service';
import { ResponseData } from '@/service/request';
import { _ADMIN_ID } from '@/config/next.env';

// 根据用户id获取博客的分类列表
export async function getBlogCategoryList<T = CategoryListData>(): Promise<T> {
  const url = `/blog/category/list/${_ADMIN_ID}`;
  const response = await fetchData<T>(url);
  if (response.code !== 0) {
    throw new Error(response.message);
  }
  return response.data;
}

// 根据分类id过滤博客列表
export const getBlogListByCategory = <T = any>(categoryId: string): Promise<ResponseData<T>> => {
  return request.get<T>('/blog/category/blog-category-list', {
    params: {
      categoryId
    }
  });
};
