import * as angular from "angular";
import { ICommon as ISgCommon } from "../common";
import { IAddMemberFn } from "../module";
import { IProxyHttp, ISgResult } from "../proxyHttp";

class ProxyHttpImpl implements IProxyHttp {

  static $inject = ["$q", "$http", "$httpParamSerializerJQLike", "sgCommon"];

  private requestingPost: boolean;
  private postApis: { [key: string]: boolean };
  private formApis: { [key: string]: boolean };
  private postPromise: ng.IPromise<any>;
  private postCancels: { [key: string]: (reason: any) => void };

  constructor(
    private $q: ng.IQService, private $http: ng.IHttpService, private $httpParamSerializerJQLike,
    private sgCommon: ISgCommon) {
    this.formApis = {};
    this.postApis = {};
    this.postCancels = {};
  }

  form<T>(api: string, form: FormData): ng.IPromise<T> {
    const path = this.sgCommon.dealPath(api, "post");
    return this.$http.post<ISgResult>(path, form, {
      cache: false,
      headers: { "Content-Type": undefined },
      transformRequest: angular.identity,
    }).then<T>(this.tf);
  }

  get<T, K>(api: string, params: K): ng.IPromise<T | any> {
    const path = this.sgCommon.dealPath(api, "get");
    return this.$http.get<ISgResult | T>(path, {
      params,
      cache: false,
    }).then(this.tf);
  }

  post<T, K>(api: string, params: K): ng.IPromise<T> {
    const path = this.sgCommon.dealPath(api, "post");
    return this.$http.post<ISgResult>(path, this.$httpParamSerializerJQLike(params), {
      cache: false,
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    }).then<T>(this.tf);
  }

  private tf = <T>(res: ng.IHttpPromiseCallbackArg<ISgResult>): ng.IPromise<T> => {
    return this.$q<T>((resolve: ng.IQResolveReject<ISgResult>, reject) => {
      if (res.data.code.toString() === "000000") {
        resolve(res.data);
      } else {
        reject(res.data);
        if (this.sgCommon.debug) {
          this.sgCommon.showMsgMid("Url: " + res.config.url + "<br /> ErrCode: " + res.data.code
            + "<br />Msg: " + res.data.msg + "<br />Params: " + JSON.stringify(res.config.params), "确定");
        }
      }

    });
  }

}

export const proxyHttp: IAddMemberFn = (module: ng.IModule) => {
  return module.service("proxyHttp", ProxyHttpImpl);
};
