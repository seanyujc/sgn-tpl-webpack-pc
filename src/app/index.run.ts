import * as ngb from "../lib/ng-bases";
import { mockPostData } from "./config/mock.conf";
import { Common } from "./core/common";
import { IRootScope } from "./core/domain/IRootScope";
import { ICommon } from "./core/services/common.service";

interface IRequestHandler {
  respond: (obj: any) => void;
  passThrough: () => void;
}

interface ISelfHttpBackendService extends ng.IHttpBackendService {
  whenPOST: (url: string | RegExp | ((str: string) => boolean), headers?, keys?) => IRequestHandler;
  whenGET: (url: string | RegExp | ((str: string) => boolean), headers?, keys?) => IRequestHandler;
}

run.$inject = ["$log", "$rootScope", "serverConfig", "common", "sgCommon", "$httpBackend", "apiConfig", "mockConfig"];
function run(
  $log, $rootScope: IRootScope, serverConfig: ngb.IServerConfigProvider, common: ICommon, sgCommon: ngb.ICommon,
  $httpBackend: ISelfHttpBackendService, apiConfig: ngb.IApiConfigProvider, mockConfig: ngb.IMockConfigProvider) {

  const q = sgCommon.q();
  // 取来源码与用户key
  // tslint:disable-next-line:no-string-literal
  $rootScope.userKey = q[(window as any).CONFIG_KEYNAME_USERKEY];
  // 仅开发环境下
  if (q.d === "1" || (Common.getEnv() === ngb.Env.DEV && q.d !== "0")) {
    const storage = window.sessionStorage;
  }
  // mock
  // if (Common.getEnv() === ngb.Env.DEV) {
  // mockConfig.post = mockData;
  // }
  $httpBackend.whenGET(/templates\//).passThrough();
  for (const key in apiConfig.post) {
    if (apiConfig.post.hasOwnProperty(key)) {
      const exp = new RegExp(apiConfig.post[key].split(":")[1]);
      if (mockConfig.post[key]) {
        $httpBackend.whenPOST(exp).respond(mockConfig.post[key]);
      } else {
        $httpBackend.whenPOST(exp).passThrough();
      }
    }
  }
}
export default run;
