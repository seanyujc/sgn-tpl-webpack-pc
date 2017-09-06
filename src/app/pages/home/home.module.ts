import * as angular from "angular";
require("!!css-loader!postcss-loader!sass-loader!./home.scss");
import HomeController from "./home.controller";

const homeModule = angular.module("home-module", []);
homeModule.controller("homeController", HomeController);

export default homeModule;
