'use strict';

/**
 * @ngdoc function
 * @name playOnWeatherApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the playOnWeatherApp
 */
angular.module('playOnWeatherApp')
  .controller('DetailCtrl',  function ($scope, $location, $routeParams, weatherData) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // Get data to be displayed - If no data at all, redirect to the start of the flow
    weatherData.getWeatherData().then(function (data) {
      $scope.data = data;
      $scope.item = data.list[$routeParams.id];
    }, function () {
      $location.path('/');
    });

  });
