var mainApplicationModuleName = 'logAggregator';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute','ngCookies']);

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});
