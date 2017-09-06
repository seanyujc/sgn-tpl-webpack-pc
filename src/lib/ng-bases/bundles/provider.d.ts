import { Env } from "./enums";
export interface ISite {
    local: string;
    remote: string;
    appID: string;
}
export interface IHost {
    domain?: string;
    dir: string;
}
export interface IHosts {
    [key: string]: IHost;
}
export interface ISites {
    [key: string]: ISite;
}
export interface IApiConfigProvider extends ng.IServiceProvider {
    hosts: IHosts;
    post: any;
    get: any;
}
export interface IServerConfigProvider extends ng.IServiceProvider {
    env: Env;
    debug: boolean;
    protocol: string;
    publicPath: string;
    sites: ISites;
    wXJsSign: string;
    wXOAuth: string;
    jsApiList: string[];
}
export interface IMockConfigProvider extends ng.IServiceProvider {
    post: any;
    get: any;
}
