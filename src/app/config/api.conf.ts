import ngb = require("../../lib/ng-bases");

apiConfig.$inject = ["apiConfigProvider", "mockConfigProvider"];
function apiConfig(apiConfigProvider: ngb.IApiConfigProvider, mockConfigProvider: ngb.IMockConfigProvider) {
    apiConfigProvider.hosts = {
        tps: { dir: "/tps" },
        test: { dir: "/tps", domain: "172.16.106.123:8080" },
    };
    apiConfigProvider.get = {
    };
    apiConfigProvider.post = {
        // 5.1	获取用户key接口
        getUserKey: "tps:/user/getUserKey", // ? sourceCode=&sourceUserId=&userName=&headUrl=&sex=&phone=&email=
    };

}

export default apiConfig;
