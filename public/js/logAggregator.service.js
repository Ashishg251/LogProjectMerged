angular.module('logAggregator').factory('loadConfig', ['$http',
  function($http) {
    var factory = {};
    factory.getdata = function(success) {
      $http.get('/config').success( function(data) {
        success(data);
      });
    };
    return factory;
}

]);
