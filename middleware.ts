import { NextResponse } from "next/server";

export function middleware() {
  const res = NextResponse.next()

  // 添加 CORS 的响应头
  res.headers.append('Access-Control-Allow-Credentials', "true")
  res.headers.append('Access-Control-Allow-Origin', '*')
  res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
  res.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  return res
}

// 指定应用中间件的路由路径
export const config = {
  matcher: '/api/:path*',
}
