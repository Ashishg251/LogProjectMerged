angular.module("logAggregator").factory('logService', function($http) {
  return {
    getPath_count : function(){
      var promise = $http({
        method: 'GET',
        url: "/json/logListing/"
      });
      return promise;
    },//close getPath_count

    getPathData: function(path, pgno){
       if(path != "All" && path != "/"){
          temp =   path.substring(1);
          path =  '/'+encodeURIComponent(temp);
        }
        else if(path == '/'){
          path = "/$"
        }
        else {
          path = "/All"
        }
        pageno = (pgno != "1") ? pgno:"1";
        var promise = $http({
                              method: 'GET',
                              url: "/json/logListing"+path+"/"+pageno,
                            });
        return promise;

    }//close getPathData
}//close return
});
