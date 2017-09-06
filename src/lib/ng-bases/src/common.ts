import { ISite } from "./provider";
export interface ICommon {
    curSite: ISite;
    debug: boolean;
    jsApiList: string[];
    dealPath(apiKey: string, method: string): string;
    q(url?: string): any;
    getJsSignUrl(): string;
    getEntrance(): string;
    getLocalSite(): string;
    showMsgMid(msg: string, operate: string): angular.ui.bootstrap.IModalServiceInstance;
}
