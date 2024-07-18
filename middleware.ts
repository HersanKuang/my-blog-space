import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // 处理管理端的路由
  if (pathname.startsWith('/login') || pathname.startsWith('/cms')) {
    return NextResponse.redirect(new URL('/success', url));
  }

  // 将原来的 /blog 重写到 404
  if (pathname === '/blog') {
    return NextResponse.rewrite(new URL('/not-found', url));
  }
  // 对博客页面的路由进行重写
  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/blog', url));
  }
  // 匹配 /post/[id] 路由
  const postMatch = pathname.match(/^\/post\/(\d{18})$/);
  if (postMatch) {
    const blogId = postMatch[1];
    return NextResponse.rewrite(new URL(`/blog/post/${blogId}`, url));
  }

  // 其他路径放行
  return NextResponse.next();
}

// 指定应用中间件的路由路径
export const config = {
  matcher: ['/((?!_next/static|assets|api|favicon.ico).*)']
};
