import { _ADMIN_ID } from '@/config/next.env';
import { getBlogList } from '@/api/blog/home';
import { getBlogMenuList } from '@/api/blog/menu';
import { getBlogCategoryList } from '@/api/blog/category';

// TODO fix: 这里的数据不会刷新

// 博客列表数据
export const { data: blogListData } = await getBlogList<BlogListData>(_ADMIN_ID!);

// 获取博客的导航列表的路由
export const { data: headerRouteLinks = [] } = await getBlogMenuList<BlogMenuList>(_ADMIN_ID!);

// 根据用户id过滤博客分类列表数据
export const { data: categoryListData } = await getBlogCategoryList<CategoryListData>(_ADMIN_ID!);
