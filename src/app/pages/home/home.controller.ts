import { ICommon } from "../../core/services/common.service";

interface IHomeScope extends ng.IScope {
  title: string;
}
export default class HomeController {
  static $inject = ["$log", "$scope", "$rootScope", "$stateParams", "common"];
  constructor(
    $log: ng.ILogService, $scope: IHomeScope, $rootScope: ng.IRootScopeService, $stateParams: angular.ui.IStateParamsService,
    common: ICommon) {

    $scope.title = "Home Page";
    $log.log("xsxx");
  }
}
