import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // 处理管理端的路由
  if (pathname.startsWith('/login') || pathname.startsWith('/cms')) {
    return NextResponse.redirect(new URL('/success', url));
  }

  // 定义需要重写的路径映射
  const rewritePaths: { [key: string]: string } = {
    '/': '/blog',
    '/archive': '/blog/archive',
    '/tags': '/blog/tags',
    '/about': '/blog/about'
  };

  // 处理特定的博客页面路由
  if (rewritePaths[pathname]) {
    return NextResponse.rewrite(new URL(rewritePaths[pathname], url));
  }

  // 处理 /blog 路由及其子路由的重写到 404
  const blogPaths = ['/blog', '/blog/archive', '/blog/tags', '/blog/about'];
  if (blogPaths.includes(pathname)) {
    return NextResponse.rewrite(new URL('/not-found', url));
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
