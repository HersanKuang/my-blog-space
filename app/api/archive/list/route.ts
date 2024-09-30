import { NextRequest } from 'next/server';
import { request } from '@/service';
import { _ADMIN_ID, _SERVER_REVALIDATE } from '@/config/next.env';
import { ResponseData } from '@/service/request';

export const dynamic = 'force-static';
export const revalidate = _SERVER_REVALIDATE;

function getBlogList<T = any>(id: string, data?: Record<string, any>): Promise<ResponseData<T>> {
  return request.post<T>(`/blog/list/${id}`, data);
}

export async function POST(req: NextRequest) {
  const { id = _ADMIN_ID, offset, size } = await req.json();
  const res = await getBlogList(id, { offset, size });
  return new Response(JSON.stringify({ code: 0, data: res.data || {} }), { status: 200 });
}
