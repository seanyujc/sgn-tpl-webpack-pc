
footerBarComponent.$inject = ["$log"];
function footerBarComponent($log: ng.ILogService) {
  const directive: ng.IDirective = {
    restrict: "E",
    scope: {
    },
    templateUrl: require("!!file-loader?name=templates/components/[name].[ext]!./footerBar.html"),
    controller: footerBarController,
  };

  return directive;

}
footerBarController.$inject = ["$log"];
function footerBarController($log: ng.ILogService) {
  $log.log("footer-bar");
}
export default footerBarComponent;
