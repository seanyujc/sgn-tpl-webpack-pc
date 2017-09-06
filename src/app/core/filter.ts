// tslint:disable:only-arrow-functions
// tslint:disable:space-before-function-paren

export default (app: ng.IModule) => {
  app
    // 显示倒计时 参数时间戳
    .filter("timepiece", function () {
      return function (endTime: number, format: string, now = new Date().getTime(), pad = false) {
        const _T = endTime - now;
        let _DD = "00";
        let _HH = "00";
        let _MM = "00";
        let _SS = "00";
        let _SSS = "000";
        let _M;
        const obj: any = {};
        if (_T < 0) { return "00:00:00"; }
        if (_T > 0) {
          _M = _T / (24 * 3600 * 1000);
          _DD = Math.floor(_M).toString();
          _M = _T % (24 * 3600 * 1000) / (3600 * 1000);
          _HH = Math.floor(_M).toString();
          _M = _T % (3600 * 1000) / (60000);
          _MM = Math.floor(_M).toString();
          _M = _T % (60000) / 1000;
          _SS = Math.floor(_M).toString();
          _SSS = (_T % 1000).toString();
          if (pad) {
            _DD = _DD.length === 1 ? 0 + _DD : _DD;
            _HH = _HH.length === 1 ? 0 + _HH : _HH;
            _MM = _MM.length === 1 ? 0 + _MM : _MM;
            _SS = _SS.length === 1 ? 0 + _SS : _SS;
            _SSS = _SSS.length === 1 ? 0 + _SSS : _SSS;
          }
        }
        obj.dd = _DD, obj.hh = _HH, obj.mm = _MM, obj.ss = _SS, obj.sss = _SSS;
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const v = obj[key];
            const reg = new RegExp(key);
            format = format.replace(reg, v);
          }
        }
        return format;
      };
    })
    .filter("validPercent", function () {
      return function (percent: number) {
        if (percent > 100) {
          return 100;
        } else {
          return percent;
        }
      };
    });
};
