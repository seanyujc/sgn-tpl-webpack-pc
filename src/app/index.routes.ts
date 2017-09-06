import {Ng1StateDeclaration} from "@uirouter/angularjs";
import * as angular from "angular";

import { IResolverServiceProvider } from "./core/providers/resolver.provider";

interface IStateProvider extends angular.IServiceProvider{
  state(name: string, config: Ng1StateDeclaration): IStateProvider;
  state(config: Ng1StateDeclaration): IStateProvider;
  decorator(name?: string, decorator?: (state: Ng1StateDeclaration, parent: Function) => any): any;
}

routes.$inject = ["$urlRouterProvider", "$stateProvider", "resolverProvider"];
function routes(
  $urlRouterProvider: angular.ui.IUrlRouterProvider, $stateProvider: IStateProvider,
  resolverProvider: IResolverServiceProvider,
) {
  // XBP-NM-ROUTE-NO-DELETE
  // 'home' CONFIG START
  $stateProvider.state("home", {
    url: "/home",
    templateUrl: require("!!file-loader?name=templates/[name].[ext]!./pages/home/home.html"),
    controller: "homeController",
    resolve: {
      homePreloading: resolverProvider.homePagePreloading,
    },
  });
  // 'home' CONFIG END
  $urlRouterProvider.otherwise("/home");
}
export default angular.module("routeBeen", []).config(routes);
