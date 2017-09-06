export interface IProxyHttp {
    get<T, K>(api: string, params: K): ng.IPromise<T>;
    post<T, K>(api: string, params: K): ng.IPromise<T>;
    form<T>(api: string, form: FormData): ng.IPromise<T>;
}

export interface ISgResult {
    code: string;
    msg: string;
}
