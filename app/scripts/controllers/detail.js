'use strict';

/**
 * @ngdoc function
 * @name playOnWeatherApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the playOnWeatherApp
 */
angular.module('playOnWeatherApp')
  .controller('DetailCtrl', ['$scope', '$location', '$routeParams', '$filter', 'weatherData', 'forecastDaysCalc', 'iconDeliver', function ($scope, $location, $routeParams, $filter, weatherData, forecastDaysCalc, iconDeliver) {
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
    }, function () {
      $location.path('/');
    });

    // Assign icons
    $scope.getWeatherIcon = function() {
      this.icon = $scope.item.weather[0].icon;
      this.equivalentWeather = $filter('filter')(iconDeliver.weatherStatusIcons, {name: this.icon});
      return this.equivalentWeather[0].icon;
    };

  }]);
