import * as angular from "angular";
import footerBarDirective from "./footerBar.directive";
import "./footerBar.scss";

const footerBarModule = angular.module("footerBar-module", []);

footerBarModule.directive("footerBar", footerBarDirective);

export default footerBarModule;
