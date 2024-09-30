import { _SERVER_REVALIDATE } from '@/config/next.env';
import { BASE_URL, TIME_OUT } from '@/service/config';

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
    revalidateSeconds = _SERVER_REVALIDATE,
    timeout = TIME_OUT
  } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const fetchOptions: RequestInit = {
      method,
      headers,
      signal: controller.signal
    };

    // 处理请求体
    if (body && method !== 'GET') {
      fetchOptions.body = JSON.stringify(body);
    }

    const fetchUrl: RequestInfo = BASE_URL + url;

    const res = await fetch(fetchUrl, {
      ...fetchOptions,
      next: { revalidate: revalidateSeconds }
    });

    clearTimeout(timer);

    if (!res.ok) {
      let errorMessage = `请求失败，状态码: ${res.status}`;
      try {
        const errorData = await res.json();
        errorMessage += `，信息: ${errorData.message || res.statusText}`;
      } catch {
        const errorText = await res.text();
        errorMessage += `，信息: ${errorText || res.statusText}`;
      }
      console.error(`${url} 接口请求失败: ${errorMessage}`);
    }

    const json: ApiResponse<T> = await res.json();

    return json;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error(`请求超时: ${url}`);
      throw new Error(`请求超时，超时时间为 ${timeout}ms`);
    }
    console.error(`fetch 失败 ${url}:`, error);
    throw error;
  }
}
