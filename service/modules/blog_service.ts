import { _ADMIN_ID } from '@/config/next.env';
import { getBlogList } from '@/api/blog/home';

export const { data: blogListData } = await getBlogList<BlogListData>(_ADMIN_ID!);
