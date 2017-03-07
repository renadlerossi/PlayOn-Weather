'use strict';

/**
 * @ngdoc function
 * @name playOnWeatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the playOnWeatherApp
 */
angular.module('playOnWeatherApp')
  .controller('MainCtrl', ['$scope', '$http', '$filter', '$location', 'weatherData', 'forecastDaysCalc', 'iconDeliver', function ($scope, $http, $filter, $location, weatherData, forecastDaysCalc, iconDeliver) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.fetch = function(searchWord) {

      // Send searchWord to getWeatherData services
      weatherData.getWeatherData(searchWord).then(function (data) {

        // Assign result of the API to a scope variable
        $scope.searchReturn = data;
      });
    };

    // Fetch data for initial state
    $scope.fetch('Dublin, IE');

    // Retrieve Current date
    $scope.currentDate = forecastDaysCalc.currentDate;

    // Retrieve 16 days date
    $scope.cardsDate = forecastDaysCalc.cardsDate;

    // Apply icons conform weather collected from the API
    $scope.getWeatherIcon = function(weather) {
      this.equivalentWeather = $filter('filter')(iconDeliver.weatherStatusIcons, {name: weather});
      return this.equivalentWeather[0].icon;
    };

    // Search typed characters in a most common cities list to avoid overloading API with requests
    $http.get('assets/common-cities.json').then(function (response) {
      $scope.commonCities = response.data.cities;
    });


    $scope.seeDetails = function (index) {
      localStorage.setItem('card', index);
      $location.path('/day-detail/' + index);
    };

  }]);
