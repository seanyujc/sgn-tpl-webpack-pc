(window as any).Promise = require("promise-polyfill");
import * as angular from "angular";
require("./index.module");

angular.element(document).ready(() => {
  angular.element(document.getElementById("loading")).remove();
  angular.bootstrap(document, ["app"], {
    strictDi: true,
  });
});
