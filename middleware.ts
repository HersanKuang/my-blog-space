import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 处理管理端的路由
  if (pathname.startsWith('/login') || pathname.startsWith('/cms')) {
    return NextResponse.redirect(new URL('/success', request.url));
  }

  // 对博客页面的路由进行重写
  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/blog', request.url));
  }

  // 对于其他路径，匹配成功
  return NextResponse.next();
}

// 指定应用中间件的路由路径
export const config = {
  matcher: ['/((?!_next/static|api|favicon.ico).*)']
};
