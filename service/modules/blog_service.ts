import { _ADMIN_ID } from '@/config/next.env';
import { getBlogList } from '@/api/blog/home';
import { getBlogMenuList } from '@/api/blog/menu';

// 博客列表数据
export const { data: blogListData } = await getBlogList<BlogListData>(_ADMIN_ID!);

// 获取博客的导航列表的路由
export const { data: headerRouteLinks = [] } = await getBlogMenuList<BlogMenuList>(_ADMIN_ID!);
