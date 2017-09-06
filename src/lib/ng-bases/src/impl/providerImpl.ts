import { Env } from "../enums";
import { IAddMemberFn } from "../module";
import * as prov from "../provider";

export const provider: IAddMemberFn = (module: ng.IModule) => {

  const serverConfigProvider: ng.IServiceProviderFactory = () => {
    const self: prov.IServerConfigProvider = {
      env: Env.DEV,
      debug: false,
      protocol: window.location.protocol,
      publicPath: "",
      sites: {},
      wXJsSign: "",
      wXOAuth: "",
      jsApiList: ["checkJsApi",
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "onMenuShareQQ",
        "onMenuShareWeibo",
        "hideMenuItems",
        "showMenuItems",
        "hideAllNonBaseMenuItem",
        "showAllNonBaseMenuItem",
        "getLocation",
        "scanQRCode"],
      $get() {
        return self;
      },
    };
    return self;
  };

  const apiConfigProvider: ng.IServiceProviderFactory = () => {
    const self: prov.IApiConfigProvider = {
      hosts: {},
      post: {},
      get: {},
      $get() {
        return self;
      },
    };
    return self;
  };

  const mockConfigProvider: ng.IServiceProviderFactory = () => {
    const self = {
      post: {},
      get: {},
      $get() {
        return self;
      },
    };
    return self;
  };

  module.provider("apiConfig", apiConfigProvider).provider("serverConfig", serverConfigProvider)
    .provider("mockConfig", mockConfigProvider);

  return module;
};
