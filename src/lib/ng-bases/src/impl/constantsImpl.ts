import { IConstBarcodeVres } from "../constants";
import { IAddMemberFn } from "../module";

export const constants: IAddMemberFn = (module: ng.IModule) => {
  module
    // 条形码验证结果
    .constant<IConstBarcodeVres>("BARCODE_VRES", {
      NOIS: 1, // 不是
      ABROAD: 2, // 仅是条码
      VALIERR: 3, // 验证失败，不符合规则
      SUCCESS: 4, // 验证成功
    });
  return module;
};
