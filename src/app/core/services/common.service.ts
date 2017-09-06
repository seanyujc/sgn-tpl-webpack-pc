import * as angular from "angular";

export interface ICommon {
  // XBP-NM-SI-NO-DELETE
  validMobileByRegular(mobile: string): boolean;
}

export class CommonService implements ICommon {
  static $inject = ["$q", "$rootScope", "$uibModal"];
  constructor(private $q: ng.IQService, private $rootScope: ng.IRootScopeService, private $uibModal: angular.ui.bootstrap.IModalService) {

  }
  // XBP-NM-SF-NO-DELETE
  validMobileByRegular(mobile: string): boolean {
    const exp = /^(\+86|86)?[1]\d{10}$/;
    return mobile.search(exp) !== -1;
  }

}
