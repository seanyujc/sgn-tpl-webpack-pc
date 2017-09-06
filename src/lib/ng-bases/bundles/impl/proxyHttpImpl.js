"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var angular = require("angular");
var ProxyHttpImpl = (function () {
    function ProxyHttpImpl($q, $http, $httpParamSerializerJQLike, sgCommon) {
        var _this = this;
        this.$q = $q;
        this.$http = $http;
        this.$httpParamSerializerJQLike = $httpParamSerializerJQLike;
        this.sgCommon = sgCommon;
        this.tf = function (res) {
            return _this.$q(function (resolve, reject) {
                if (res.data.code.toString() === "000000") {
                    resolve(res.data);
                }
                else {
                    reject(res.data);
                    if (_this.sgCommon.debug) {
                        _this.sgCommon.showMsgMid("Url: " + res.config.url + "<br /> ErrCode: " + res.data.code
                            + "<br />Msg: " + res.data.msg + "<br />Params: " + JSON.stringify(res.config.params), "确定");
                    }
                }
            });
        };
        this.formApis = {};
        this.postApis = {};
        this.postCancels = {};
    }
    ProxyHttpImpl.prototype.form = function (api, form) {
        var path = this.sgCommon.dealPath(api, "post");
        return this.$http.post(path, form, {
            cache: false,
            headers: { "Content-Type": undefined },
            transformRequest: angular.identity,
        }).then(this.tf);
    };
    ProxyHttpImpl.prototype.get = function (api, params) {
        var path = this.sgCommon.dealPath(api, "get");
        return this.$http.get(path, {
            params: params,
            cache: false,
        }).then(this.tf);
    };
    ProxyHttpImpl.prototype.post = function (api, params) {
        var path = this.sgCommon.dealPath(api, "post");
        return this.$http.post(path, this.$httpParamSerializerJQLike(params), {
            cache: false,
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        }).then(this.tf);
    };
    ProxyHttpImpl.$inject = ["$q", "$http", "$httpParamSerializerJQLike", "sgCommon"];
    return ProxyHttpImpl;
}());
exports.proxyHttp = function (module) {
    return module.service("proxyHttp", ProxyHttpImpl);
};
//# sourceMappingURL=proxyHttpImpl.js.map