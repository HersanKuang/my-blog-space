/* eslint-disable @typescript-eslint/no-shadow */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  Canceler,
  InternalAxiosRequestConfig
} from 'axios';

// 声明服务端响应体的基本数据结构类型
export interface ResponseData<T = any> {
  code?: number;
  msg?: string;
  data?: T;
  [key: string]: any;
}

// 声明 Request 实例方法 toAwait 的返回值类型
export type AwaitReturn<T> = [Error | undefined, T | undefined];

// 扩展 AxiosRequestConfig 配置类型
export interface Interceptors<T = AxiosResponse> {
  requestSuccessFn?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  requestFailureFn?: (error: any) => any;
  responseSuccessFn?: (res: T) => T | Promise<T>;
  responseFailureFn?: (error: any) => any;
}

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: Interceptors<T>;
}

// 基于 axios 创建的网络请求类
class Request {
  // Axios 实例对象
  private _instance: AxiosInstance;

  // token 失效后, 待处理的网络请求集合
  private static pendings: Array<() => void> = [];

  // 网络请求的集合
  private static requestMap: Map<string, Canceler> = new Map();

  // 是否已经刷新 token 的标识
  private static isRefreshing: boolean = false;

  // 构造函数, 初始化工作
  constructor(config: RequestConfig) {
    // 创建 axios 实例
    this._instance = axios.create(config);

    // 添加全局请求拦截器
    this._instance.interceptors.request.use(
      // eslint-disable-next-line no-shadow
      config => this.interceptRequestDone(config),
      error => this.interceptRequestFail(error)
    );

    // 添加全局响应拦截器
    this._instance.interceptors.response.use(
      response => this.interceptResponseDone(response),
      error => this.interceptResponseFail(error)
    );

    // 针对特定的 request 实例添加拦截器
    if (config.interceptors) {
      this._instance.interceptors.request.use(
        config.interceptors.requestSuccessFn,
        config.interceptors.requestFailureFn
      );
      this._instance.interceptors.response.use(
        config.interceptors.responseSuccessFn,
        config.interceptors.responseFailureFn
      );
    }
  }

  // 取消网络请求的函数
  public static cancelRequest(requestKey: string): void {
    const cancel = Request.requestMap.get(requestKey);
    if (cancel) {
      cancel();
      Request.requestMap.delete(requestKey);
    }
  }

  // 网络请求发送前的处理函数
  private interceptRequestDone(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    if (typeof window !== 'undefined') {
      const requestKey = `${config.method}-${config.url}-${JSON.stringify(config.params)}`;
      Request.cancelRequest(requestKey);

      config.cancelToken = new axios.CancelToken(cancel => {
        Request.requestMap.set(requestKey, cancel);
      });
    }

    return config;
  }

  // 网络请求发送前出现错误或失败的处理函数
  private interceptRequestFail(error: AxiosError): Promise<AxiosError> {
    return Promise.reject(error);
  }

  // 网络请求响应成功的处理函数
  private interceptResponseDone(response: AxiosResponse): AxiosResponse {
    const { config } = response;
    Request.cancelRequest(`${config.method}-${config.url}-${JSON.stringify(config.params)}`);
    return response.data;
  }

  // 网络请求响应失败的处理函数
  private interceptResponseFail(error: AxiosError): Promise<AxiosError> {
    if (error.response) {
      const { config } = error.response;
      Request.cancelRequest(`${config.method}-${config.url}-${JSON.stringify(config.params)}`);
    }
    return Promise.reject(error);
  }

  /**
   * 序列化参数方法
   * @param {object} params 需要序列化的对象
   */
  public serialize(params: Record<string, any>): string {
    const temp: string[] = [];
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => {
          temp.push(`${key}=${encodeURIComponent(item)}`);
        });
      } else {
        temp.push(`${key}=${encodeURIComponent(value)}`);
      }
    });
    return temp.join('&');
  }

  // 简化使用 async/await 调用 get、put、post、delete 时的转换方法
  public async toAwait<T = any>(promise: Promise<any>): Promise<AwaitReturn<T>> {
    return promise
      .then<AwaitReturn<T>>(data => [undefined, data])
      .catch(error => [error, undefined]);
  }

  // 封装 get 请求方法
  public get<T = any, R = ResponseData<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this._instance.get<T, R>(url, config);
  }

  // 封装 put 请求方法
  public put<T = any, R = ResponseData<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this._instance.put<T, R>(url, data, config);
  }

  // 封装 post 请求方法
  public post<T = any, R = ResponseData<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this._instance.post<T, R>(url, data, config);
  }

  // 封装 delete 请求方法
  public delete<T = any, R = ResponseData<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this._instance.delete<T, R>(url, config);
  }

  // 封装 request 请求方法
  public request<T = any, R = ResponseData<T>>(config: AxiosRequestConfig): Promise<R> {
    return this._instance.request<T, R>(config);
  }
}

// 导出 Request 类的实例
export default Request;
