import * as angular from "angular";
import { ICommon } from "../common";
import { Env } from "../enums";
import { IAddMemberFn } from "../module";
import { IApiConfigProvider, IHost, IServerConfigProvider, ISite } from "../provider";

class CommonFactory implements ICommon {

  static $inject = ["$q", "$http", "apiConfig", "serverConfig", "$uibModal"];

  public debug: boolean;
  public jsApiList: string[];
  curSite: ISite;
  private env: Env;
  private protocol: string;
  private domain: string;
  private localSite: string;
  private entrance: string;
  private jsSignUrl: string;
  private msgs: string[];
  private isShowModal: boolean;

  constructor(
    private $q: ng.IQService, private $http: ng.IHttpService, private apiConfig: IApiConfigProvider,
    private serverConfig: IServerConfigProvider, private $uibModal: angular.ui.bootstrap.IModalService) {

    const URL_TPL = "//{DOMAIN}{HOST_API}?appId=APPID&path=PATH&state=!STATE";

    this.env = serverConfig.env;
    this.debug = serverConfig.debug;
    this.protocol = serverConfig.protocol;
    this.curSite = serverConfig.sites[this.env];
    this.domain = this.curSite.remote;
    this.localSite = this.protocol + "//" + this.curSite.local + serverConfig.publicPath;
    this.entrance = this.protocol + URL_TPL.replace(/\{DOMAIN}/, this.curSite.remote).replace(/\{HOST_API}/, serverConfig.wXOAuth)
      .replace("APPID", this.curSite.appID);
    this.jsSignUrl = "//" + this.curSite.remote + serverConfig.wXJsSign;
    this.jsApiList = serverConfig.jsApiList;
    this.msgs = [];
    this.isShowModal = false;
  }

  trim(s: string): string {
    return s.replace(/^[\s\t ]+/g, "");
  }

  dealPath(apiKey = "", method = "get"): string {
    let _API = "";
    let _URL = apiKey;
    method = method.toLocaleLowerCase();
    if (!this.apiConfig[method]) { return ""; }
    if (this.apiConfig[method][apiKey]) {
      _API = this.apiConfig[method][apiKey];
      if (_API.indexOf(":") !== -1) {
        _URL = "//{DOMAIN}{HOST}{API}";
        const _P = _API.split(":");
        _P[0] = this.trim(_P[0]);
        _P[1] = this.trim(_P[1]);
        const host: IHost = this.apiConfig.hosts[_P[0]];
        const _DOMAIN = host.domain ? host.domain : this.domain;
        _URL = _URL.replace(/\{DOMAIN}/, _DOMAIN).replace(/\{HOST}/, host.dir).replace(/\{API}/, _P[1]);
      } else {
        _URL = _API;
      }
    }

    return _URL;
  }

  getLocalSite(): string {
    return this.localSite;
  }

  getEntrance(): string {
    return this.entrance;
  }

  getJsSignUrl(): string {
    return this.jsSignUrl;
  }

  q(search = window.location.search): any {
    const q = {};
    let _Q;
    if (search.split("?")[1]) {
      _Q = search.split("?")[1].split("&");
      for (let i = 0, l = _Q.length; i < l; i++) {
        const _T = _Q[i].split("=");
        q[_T[0]] = _T[1];
      }
    }
    return q;
  }

  showMsgMid(msg: string): angular.ui.bootstrap.IModalServiceInstance | any {
    if (this.isShowModal) {
      this.msgs.push(msg);
    } else {
      this.isShowModal = true;
      const uibModalInstance = this.$uibModal.open({
        windowTopClass: "msg-mid-modal",
        template: `<section><h3>提示信息</h3><p style="color:#a6aeb7">${msg}</p></section>
<footer><button type="button" class="btn btn-success btn-lg" ng-click="ok()">确定</button></footer>`,
        controller: ["$scope", "$uibModalInstance",
          ($scope, $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance) => {
            $scope.ok = $uibModalInstance.close;
          }],
      });
      uibModalInstance.result.then(() => {
        this.isShowModal = false;
        return this.$q((resolve, reject) => {
          if (this.msgs.length > 0) {
            this.showMsgMid(this.msgs.shift());
          }
          resolve();
        });
      }, angular.noop);
      return uibModalInstance;
    }
  }
}

export const common: IAddMemberFn = (module: ng.IModule) => {
  return module.service("sgCommon", CommonFactory);
};
