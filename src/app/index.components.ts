import * as angular from "angular";
// XBP-NC1-CONFIG-NO-DELETE
// 'footerBar' CONFIG 1 START
import footerBarModule from "./components/footerBar/footerBar.module";
// 'footerBar' CONFIG 1 END

export default angular.module("index.components", [
  // XBP-NC2-CONFIG-NO-DELETE
  // 'footerBar' CONFIG 2 START
  footerBarModule.name,
  // 'footerBar' CONFIG 2 END
]);
