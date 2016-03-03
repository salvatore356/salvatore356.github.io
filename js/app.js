'use strict';
angular.module('app', [])
.controller('CvController',['$scope','$http', '$window',function ($scope, $http, $window){
	$scope.warning='';
	$scope.p_details={};
	$scope.experience={};
	$scope.studies={};
  $scope.projects={};
  $scope.technologies={};
  $scope.i=0;

  $scope.labels={};

  $scope.$watch("lang",function(){
    $scope.translate();
  });

  $scope.translate= function(){
    if($scope.lang!=undefined)
      $http({
        method: 'GET',
        url: "data/translation/tags/"+$scope.lang+".json"
      }).then(function successCallback(response) {
        $scope.labels=response.data;
      }, function errorCallback(response) {
        $scope.warning="Something is wrong "+response.data;
      });
  };

  $scope.load_details=function(){

    $http({
      method: 'GET',
      url: "data/translation/details/p_details.json"
    }).then(function successCallback(response) {
      $scope.p_details=response.data;
      $scope.loading_p_details=false;
    }, function errorCallback(response) {
      $scope.warning="Something is wrong in techs";
    });

    $http({
      method: 'GET',
      url: "data/translation/details/experience.json"
    }).then(function successCallback(response) {
      $scope.experience=response.data;
    }, function errorCallback(response) {
      $scope.warning="Something is wrong in exprience";
    });
  
    $http({
      method: 'GET',
      url: "data/translation/details/studies.json"
    }).then(function successCallback(response) {
      $scope.studies=response.data;
    }, function errorCallback(response) {
      $scope.warning="Something is wrong in studies";
    });

    $http({
      method: 'GET',
      url: "data/translation/details/techs.json"
    }).then(function successCallback(response) {
      $scope.technologies=response.data;
    }, function errorCallback(response) {
      $scope.warning="Something is wrong in techs";
    });

    $http({
      method: 'GET',
      url: "data/translation/details/projects.json"
    }).then(function successCallback(response) {
      var posiciones=[0,0,0,0,0,0,0,0];
      var i=0;
      angular.forEach(response.data, function(value, key) {
        var p=i%8;
        value.top=calcularTop(p, posiciones[p]);
        posiciones[p]++;
        i++;
      });
      $scope.projects=response.data;
    }, function errorCallback(response) {
      $scope.warning="Something is wrong in projects";
    });

    $scope.loading=false;

  };
	
	
$window.onload = function() {
    var browserLanguage = $window.navigator.language||navigator.browserLanguage;
    var ln= browserLanguage[0] + browserLanguage[1];
    switch(ln){
      case 'de':  $scope.lang="de";
                  break;
      case 'en':  $scope.lang="en";
                  break;
      case 'fr':  $scope.lang="fr";
                  break;
      case 'it':  $scope.lang="it";
                  break;
      case 'pt':  $scope.lang="pt";
                  break;
      default:  $scope.lang="es";
                break;
    }
    $scope.load_details();
    $scope.translate();    
  } 
  

  
}]);

function calcularTop(posicion, grupo){
  var result;
  switch(posicion){
    case 0: result= 140*grupo;
            break;
    case 1: result=140*grupo;
            break;
    case 2: result=(140*grupo)+35;
            break;
    case 3: result=(140*grupo)+35;
            break;
    case 4: result=(140*grupo)+70;
            break;
    case 5: result=(140*grupo)+70;
            break;
    case 6: result=(140*grupo)+105;
            break;
    case 7: result=(140*grupo)+70;
            break;
    default:  result=0;
              break; 
  };
  return result;
}