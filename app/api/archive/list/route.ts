import { NextRequest } from 'next/server';
import { getBlogList } from '@/api/blog/home';
import { _ADMIN_ID, _SERVER_REVALIDATE } from '@/config/next.env';

export const dynamic = 'force-static';
export const revalidate = _SERVER_REVALIDATE;

export async function POST(req: NextRequest) {
  const { id = _ADMIN_ID, offset, size } = await req.json();
  const res = await getBlogList<BlogListData>(id, { offset, size });
  return new Response(JSON.stringify({ code: 0, data: res.data || {} }), { status: 200 });
}
