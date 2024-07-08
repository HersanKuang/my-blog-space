import { NextResponse } from "next/server";

export function middleware() {
  const res = NextResponse.next()

  return res
}

// 指定应用中间件的路由路径
export const config = {
  matcher: '/:path*',
}
