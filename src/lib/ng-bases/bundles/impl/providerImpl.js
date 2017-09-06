"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provider = function (module) {
    var serverConfigProvider = function () {
        var self = {
            env: 1 /* DEV */,
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
            $get: function () {
                return self;
            },
        };
        return self;
    };
    var apiConfigProvider = function () {
        var self = {
            hosts: {},
            post: {},
            get: {},
            $get: function () {
                return self;
            },
        };
        return self;
    };
    var mockConfigProvider = function () {
        var self = {
            post: {},
            get: {},
            $get: function () {
                return self;
            },
        };
        return self;
    };
    module.provider("apiConfig", apiConfigProvider).provider("serverConfig", serverConfigProvider)
        .provider("mockConfig", mockConfigProvider);
    return module;
};
//# sourceMappingURL=providerImpl.js.map