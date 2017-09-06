import ngb = require("../../lib/ng-bases");
import { Common } from "../core/common";

siteConfig.$inject = ["serverConfigProvider", "iScrollServiceProvider", "$locationProvider"];
function siteConfig(serverConfigProvider: ngb.IServerConfigProvider, iScrollServiceProvider, $locationProvider: ng.ILocationProvider) {
    // 172.16.106.118  172.16.103.214
    const dev: ngb.ISite = { local: "dh5.lianbi.com.cn", remote: "172.16.103.211", appID: "xxx" };
    const test: ngb.ISite = { local: "th5.lianbi.com.cn", remote: "172.16.103.211", appID: "yyy" };
    const pro: ngb.ISite = { local: "h5.lianbi.com.cn", remote:  (window as any).CONFIG_DOMAIN || "222.73.156.78", appID: "zzz" };

    serverConfigProvider.sites[ngb.Env.DEV] = dev;
    serverConfigProvider.sites[ngb.Env.TEST] = test;
    serverConfigProvider.sites[ngb.Env.PRO] = pro;
    serverConfigProvider.env = Common.getEnv();
    serverConfigProvider.debug = Common.getEnv() === ngb.Env.DEV;
    serverConfigProvider.publicPath = Common.getPublicPath();
    serverConfigProvider.wXJsSign = "/credit/app/wechat/jsapi"; // js权限验证对象获取路径
    serverConfigProvider.wXOAuth = "/credit/app/wechat/auth_base"; // 网页授权认证

    // iscroll config
    iScrollServiceProvider.configureDefaults({
        iScroll: {
            bindToWrapper: true,
            probeType: 3,
            scrollbars: false,
            momentum: true,
            mouseWheel: true,
            preventDefaultException: {
                tagName: /^(input|button|label|a|span|div|use|svg|path)$/,
                className: /(^|\s)iscroll-default(\s|$)/,
            },
        },
        directive: {
            asyncRefreshDelay: 0,
            refreshInterval: false,
        },
    });

    $locationProvider.html5Mode(true);
}

export default siteConfig;
