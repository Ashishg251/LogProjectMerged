angular.module('logAggregator').factory('getTrafficData',
  function($http) {
    return {
      getData : function( year, month,onComplete) {
        complete = function() {
          if(onComplete)
            onComplete();
        }
        return  $http({
          method: "get",
          url: "json/trafficRate/"+year+"/"+month,
          complete: complete()
        });
      }
    }
  }
);
