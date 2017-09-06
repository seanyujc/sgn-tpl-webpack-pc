import "./styles/common.scss";

import * as uiRooter from "@uirouter/angularjs";
import * as angular from "angular";

import apiConfig from "./config/api.conf";
import siteConfig from "./config/site.conf";
import core from "./core/core.module";
import components from "./index.components";
import routes from "./index.routes";
import run from "./index.run";

import ngb = require("../lib/ng-bases");

require("angular-i18n/angular-locale_zh-cn");
require("angular-mocks");
require("ngtouch");
export let app = angular.module("app", [
  uiRooter.default,
  require("angular-animate"),
  require("../lib/angular-ui-bootstrap"),
  require("angular-sanitize"),
  require("../lib/angular-iscroll").name,
  "ngTouch",
  "ngMockE2E",
  require("oclazyload"),
  components.name,
  ngb.sgNgBases.name,
  core.name,
  routes.name,
]);

AppMainController.$inject = ["$scope", "iScrollService"];
function AppMainController($scope, iScrollService) {
  $scope.iScrollState = iScrollService.state;
}

app.config(siteConfig).config(apiConfig).run(run).controller("AppMainController", AppMainController);
