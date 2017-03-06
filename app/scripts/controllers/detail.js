'use strict';

/**
 * @ngdoc function
 * @name playOnWeatherApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the playOnWeatherApp
 */
angular.module('playOnWeatherApp')
  .controller('DetailCtrl',  function ($scope, $location, $routeParams, weatherData, forecastDaysCalc) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // Assign card date with card index
    $scope.currentCardDate = forecastDaysCalc.cardsDate[$routeParams.id];

    // Get data to be displayed - If no data at all, redirect to the start of the flow
    weatherData.getWeatherData().then(function (data) {
      $scope.data = data;
      $scope.item = data.list[$routeParams.id];
      console.log($scope.item);
    }, function () {
      $location.path('/');
    });

  });
