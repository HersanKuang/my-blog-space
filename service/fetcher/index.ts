import { BASE_URL, TIME_OUT } from '@/service/config';
import { _SERVER_REVALIDATE, _RENDER_MODE } from '@/config/next.env';

export interface ApiResponse<T> {
  code: number;
  data: T;
  message?: string;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions<T> {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: T;
  revalidateSeconds?: number;
  timeout?: number;
}

function createQueryString(params: Record<string, any>): string {
  const queryString = new URLSearchParams(params).toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Next.js v14 用于网络请求的工具函数，扩展了原生的 fetch，我们在这里对它进行封装
 * 注意：fetchData 中设置的 revalidate 不会和页面导出的冲突
 * @param {string} url 网络请求的 url
 * @param {FetchOptions} options 配置参数
 */
export default async function fetchData<T, B = undefined>(
  url: string,
  options: FetchOptions<B> = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    headers = {
      'Content-Type': 'application/json'
    },
    body,
    revalidateSeconds = _SERVER_REVALIDATE || 0,
    timeout = TIME_OUT
  } = options;

  // 创建一个新的 AbortController 实例，用于控制请求的取消
  const controller = new AbortController();
  // 设置一个定时器，当请求时间超过 timeout 时自动调用 controller.abort() 取消请求
  const timer = setTimeout(() => {
    controller.abort();
  }, timeout);

  let fetchUrl: RequestInfo = BASE_URL + url;

  try {
    const fetchOptions: RequestInit = {
      method,
      headers,
      signal: controller.signal // 将中止信号传递给 fetch 请求，以便在需要时可以中止请求
    };

    // 处理请求体
    if (method === 'GET' && typeof body === 'object') {
      const queryString = createQueryString(<Record<string, any>>body);
      fetchUrl += queryString;
    } else if (body && method !== 'GET') {
      fetchOptions.body = JSON.stringify(body);
    }

    const res = await fetch(fetchUrl, {
      ...fetchOptions,
      next: _RENDER_MODE === 'isr' ? { revalidate: revalidateSeconds } : undefined
    });

    // 请求成功后清除定时器，防止内存泄漏
    clearTimeout(timer);

    let responseData: ApiResponse<T> | null = null;
    let responseText: string | null = null;

    try {
      responseData = await res.json();
    } catch {
      responseText = await res.text();
    }

    if (!res.ok) {
      const errorMessage = responseData?.message || responseText || res.statusText;
      console.error(`${fetchUrl} 接口请求失败，状态码: ${res.status}，信息: ${errorMessage}`);
    }

    // 返回 JSON 数据，如果 message 为 null，则将其转为 undefined
    return (
      responseData || {
        code: res.status,
        data: <T>{},
        message: responseText || undefined
      }
    );
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error(`请求超时: ${fetchUrl}`);
      throw new Error(`请求超时，超时时间为 ${timeout}ms`);
    }
    console.error(`fetch 失败 ${fetchUrl}:`, error);
    throw error;
  }
}
