angular.module('logAggregator').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl : 'js/nginx/auth/views/auth.view.html',
      controller : 'authController'
    })
    .when('/login', {
      redirectTo : 'js/nginx/auth/views/auth.view.html',
      controller : 'authController'
    })
    .when('/changePassword', {
      templateUrl : 'js/nginx/auth/views/changePassword.view.html',
      controller : 'changePasswordController'
    })
    .when('/aboutus', {
      templateUrl : 'js/nginx/auth/views/aboutus.view.html',
      controller: 'aboutusController'
    })
    .when('/agentAnalytics', {
      templateUrl : 'js/nginx/userAgent/views/userAgent.view.html',
      controller : 'userAgentController'
    })
    .when('/logListing', {
      templateUrl : 'js/nginx/logListing/views/logListing.view.html',
      controller : 'logController'
    })
    .when('/requestRate', {
      templateUrl : 'js/nginx/trafficRate/views/trafficRate.view.html',
      controller : 'trafficRateController'
    })
    .when('/errorhandler', {
      templateUrl : 'js/nginx/auth/views/error.view.html',
      controller : 'errorHandlerController'
    })
    .otherwise({
      redirectTo : '/',
      controller : 'errorHandlerController'
    });
  }
]);
