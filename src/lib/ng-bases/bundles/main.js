"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by sean on 2017/2/3.
 */
var commonImpl_1 = require("./impl/commonImpl");
var constantsImpl_1 = require("./impl/constantsImpl");
var moduleImpl_1 = require("./impl/moduleImpl");
var providerImpl_1 = require("./impl/providerImpl");
var proxyHttpImpl_1 = require("./impl/proxyHttpImpl");
commonImpl_1.common(moduleImpl_1.sgNgBases);
providerImpl_1.provider(moduleImpl_1.sgNgBases);
constantsImpl_1.constants(moduleImpl_1.sgNgBases);
proxyHttpImpl_1.proxyHttp(moduleImpl_1.sgNgBases);
__export(require("./impl/moduleImpl"));
__export(require("./enums"));
//# sourceMappingURL=main.js.map