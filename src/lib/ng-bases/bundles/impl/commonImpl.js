"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var angular = require("angular");
var CommonFactory = (function () {
    function CommonFactory($q, $http, apiConfig, serverConfig, $uibModal) {
        this.$q = $q;
        this.$http = $http;
        this.apiConfig = apiConfig;
        this.serverConfig = serverConfig;
        this.$uibModal = $uibModal;
        var URL_TPL = "//{DOMAIN}{HOST_API}?appId=APPID&path=PATH&state=!STATE";
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
    CommonFactory.prototype.trim = function (s) {
        return s.replace(/^[\s\t ]+/g, "");
    };
    CommonFactory.prototype.dealPath = function (apiKey, method) {
        if (apiKey === void 0) { apiKey = ""; }
        if (method === void 0) { method = "get"; }
        var _API = "";
        var _URL = apiKey;
        method = method.toLocaleLowerCase();
        if (!this.apiConfig[method]) {
            return "";
        }
        if (this.apiConfig[method][apiKey]) {
            _API = this.apiConfig[method][apiKey];
            if (_API.indexOf(":") !== -1) {
                _URL = "//{DOMAIN}{HOST}{API}";
                var _P = _API.split(":");
                _P[0] = this.trim(_P[0]);
                _P[1] = this.trim(_P[1]);
                var host = this.apiConfig.hosts[_P[0]];
                var _DOMAIN = host.domain ? host.domain : this.domain;
                _URL = _URL.replace(/\{DOMAIN}/, _DOMAIN).replace(/\{HOST}/, host.dir).replace(/\{API}/, _P[1]);
            }
            else {
                _URL = _API;
            }
        }
        return _URL;
    };
    CommonFactory.prototype.getLocalSite = function () {
        return this.localSite;
    };
    CommonFactory.prototype.getEntrance = function () {
        return this.entrance;
    };
    CommonFactory.prototype.getJsSignUrl = function () {
        return this.jsSignUrl;
    };
    CommonFactory.prototype.q = function (search) {
        if (search === void 0) { search = window.location.search; }
        var q = {};
        var _Q;
        if (search.split("?")[1]) {
            _Q = search.split("?")[1].split("&");
            for (var i = 0, l = _Q.length; i < l; i++) {
                var _T = _Q[i].split("=");
                q[_T[0]] = _T[1];
            }
        }
        return q;
    };
    CommonFactory.prototype.showMsgMid = function (msg) {
        var _this = this;
        if (this.isShowModal) {
            this.msgs.push(msg);
        }
        else {
            this.isShowModal = true;
            var uibModalInstance = this.$uibModal.open({
                windowTopClass: "msg-mid-modal",
                template: "<section><h3>\u63D0\u793A\u4FE1\u606F</h3><p style=\"color:#a6aeb7\">" + msg + "</p></section>\n<footer><button type=\"button\" class=\"btn btn-success btn-lg\" ng-click=\"ok()\">\u786E\u5B9A</button></footer>",
                controller: ["$scope", "$uibModalInstance",
                    function ($scope, $uibModalInstance) {
                        $scope.ok = $uibModalInstance.close;
                    }],
            });
            uibModalInstance.result.then(function () {
                _this.isShowModal = false;
                return _this.$q(function (resolve, reject) {
                    if (_this.msgs.length > 0) {
                        _this.showMsgMid(_this.msgs.shift());
                    }
                    resolve();
                });
            }, angular.noop);
            return uibModalInstance;
        }
    };
    CommonFactory.$inject = ["$q", "$http", "apiConfig", "serverConfig", "$uibModal"];
    return CommonFactory;
}());
exports.common = function (module) {
    return module.service("sgCommon", CommonFactory);
};
//# sourceMappingURL=commonImpl.js.map