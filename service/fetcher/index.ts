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

function createQueryString(params: Record<string, any>): string {
  const queryString = new URLSearchParams(params).toString();
  return queryString ? `?${queryString}` : '';
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
    revalidateSeconds = 0,
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
      const queryString = createQueryString(body as Record<string, any>);
      fetchUrl += queryString;
    } else if (body && method !== 'GET') {
      fetchOptions.body = JSON.stringify(body);
    }

    const res = await fetch(fetchUrl, {
      ...fetchOptions,
      next: { revalidate: revalidateSeconds }
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
        data: {} as T,
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
