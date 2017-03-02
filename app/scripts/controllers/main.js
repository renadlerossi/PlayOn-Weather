'use strict';

/**
 * @ngdoc function
 * @name playOnWeatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the playOnWeatherApp
 */
angular.module('playOnWeatherApp')
  .controller('MainCtrl', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.$watch('search', function() {
      fetch();
    });

    function fetch() {
      $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?q=" + $scope.search + "&units=metric&cnt=16&APPID=e57b113884f4ac1565de77e3b580388c")
        .then(function (response) {
          console.log(response.data);
        });
    }

  });
