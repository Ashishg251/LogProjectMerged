angular.module('logAggregator').controller('authController', ['$scope','$cookies' ,'$http','$rootScope','$location',
function($scope,$cookies, $http, $rootScope, $location) {
  var EMAIL_REGEXP = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  var check = false;
  $scope.error_message = '';
  $scope.checkData="";
  if($cookies.get('login')==='true'){
    $location.path('/logListing');
  }

  var result=document.getElementsByClassName('homepage');
  angular.element(result).css('display','none');

  $scope.login = function(username,password){
    $scope.user={
      username:username,
      password:password
    };
    $http.post('/auth/login', $scope.user).then(function(response){
      if(response.data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.loginMessage="";
        $rootScope.current_user = response.data.user.username;
        $rootScope.tab = "logListing";
        var result=document.getElementsByClassName('homepage');
        angular.element(result).css('display','block');
        $cookies.put('login','true');
        console.log("setting cookie value"+$cookies.get('login'));
        $location.path('/logListing');
      }
      else{
        $scope.error_message = response.data.message;
        $rootScope.loginMessage="Invalid username or password";
      }
    });
  };

  $scope.register = function(){
    $scope.userDetails={
      firstName:$scope.firstName,
      lastName:$scope.lastName,
      username:$scope.username,
      email:$scope.email,
      password:$scope.password
    };

    if (!$scope.firstName || !$scope.lastName || !$scope.username || !$scope.email || !$scope.password || !$scope.confirmPassword){

      $scope.checkData = "*Please fill all the fields";
    }


    if ($scope.password && (""+$scope.password.length)<6){
      $scope.checkData = "Password should be of minimum 6 characters";
    }

    if($scope.email){
      var isMatchRegex = EMAIL_REGEXP.test($scope.email);
      console.log(isMatchRegex);
      if(isMatchRegex == false){
        $scope.checkData="Invalid email id";
      }
      else{
        check = true;
      }
    }

    if(check==true) {
      if ($scope.password && $scope.confirmPassword && $scope.password==$scope.confirmPassword){
        $http.post('/auth/signup', $scope.userDetails).success(function(data){
          if(data.state == 'success'){
            $rootScope.authenticated = true;
            $scope.checkData="";
            $rootScope.current_user = data.user.username;
            $rootScope.loginMessage="Sign up successful. Please login to continue.";
            $location.path('/login');
          }
          else{
            $scope.error_message = data.message;
          }
        });
      }
      else if ($scope.password && $scope.confirmPassword && $scope.password != $scope.confirmPassword){
        $scope.checkData="Password didn't match";

      }
    }

  };

}]);
