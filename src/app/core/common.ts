import * as ngb from "../../lib/ng-bases";

declare var NODE_ENV: string;
declare var PUBLIC_PATH: string;

export class Common {
  static Wi: number[] = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
  static ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X

  static getEnv(): ngb.Env {
    let env = ngb.Env.DEV;
    if (NODE_ENV === "TEST") {
      env = ngb.Env.TEST;
    } else if (NODE_ENV === "PRO") {
      env = ngb.Env.PRO;
    }
    return env;
  }
  static getPublicPath() {
    return PUBLIC_PATH;
  }
  static trim(str: string): string {
    return str && str.replace(/^\s|\s$/, "");
  }
  static prefixNumber(num: number, length: number): string {
    let numTmp = num.toString();
    for (let i = 0; i < length - numTmp.length; i++) {
      numTmp = "0" + numTmp;
    }
    return numTmp;
  }
  /**
   * 时间差
   * @param firstTime
   * @param secondTime
   */
  static getTimeReduce(firstTime: string, secondTime: string): string {
    const first = firstTime.split(":");
    const second = secondTime.split(":");
    const firstT = Number(first[0]) * 60 + Number(first[1]);
    const secondT = Number(second[0]) * 60 + Number(second[1]);
    let reduce = 0;
    if ((secondT - firstT) > 0) {
      reduce = secondT - firstT;
    } else if ((secondT - firstT) < 0) {
      reduce = (secondT - firstT) + 24 * 60;
    }
    // tslint:disable-next-line:radix
    const hour = Math.floor(reduce / 60);
    const minute = reduce % 60;
    let str = "约" + hour + "小时" + minute + "分";
    if (hour === 0) {
      str = "约" + minute + "分";
    }
    if (minute === 0) {
      str = "约" + hour + "小时";
    }
    return str;
  }
  /**
   * 判断身份证号码为18位时最后的验证位是否正确
   * @param idCard 身份证号码数组
   * @return
   */
  // tslint:disable-next-line:ban-types
  static isTrueValidateCodeBy18IdCard(idCard: string[]) {
    let sum = 0; // 声明加权求和变量
    if (idCard[17].toLowerCase() === "x") {
      idCard[17] = "10"; // 将最后位为x的验证码替换为10方便后续操作
    }
    for (let n = 0; n < 17; n++) {
      sum += this.Wi[n] * +idCard[n]; // 加权求和
    }
    const valCodePosition = sum % 11; // 得到验证码所位置
    if (+idCard[17] === this.ValideCode[valCodePosition]) {
      return true;
    } else {
      return false;
    }
  }
}
