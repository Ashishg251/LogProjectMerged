angular.module('logAggregator').factory('agentDataService', ['$http',
  function($http) {
    return {
      getAgentData: function(handleSuccess, handleError, criteria, year, month, onComplete) {
          complete = function() {
            if(onComplete)
              onComplete();
          }
          var request = $http({
            method: "get",
            url: "json/userAgent/"+criteria+"/"+year+"/"+month,
            complete : complete()
          });
          request.then( function(data) {
            handleSuccess(data, criteria);
          }, function(data) {
            handleError(data, criteria);
          }
        );
      }
    }
  }
]);
