'use strict';

/**
 * @ngdoc function
 * @name playOnWeatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the playOnWeatherApp
 */
angular.module('playOnWeatherApp')
  .controller('MainCtrl', function ($scope, $http, $filter, $location, weatherData, forecastDaysCalc) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // Retrieve Current date
    $scope.currentDate = forecastDaysCalc.currentDate;

    // Retrieve 16 days date
    $scope.cardsDate = forecastDaysCalc.cardsDate;

    // Load weather Icons
    var weatherStatusIcons = [
      {name: '01d', icon: 'wi-day-sunny'},
      {name: '01n', icon: 'wi-night-clear'},
      {name: '02d', icon: 'wi-day-cloudy'},
      {name: '02n', icon: 'wi-night-alt-cloudy'},
      {name: '03d', icon: 'wi-day-rain-mix'},
      {name: '03n', icon: 'wi-night-alt-showers'},
      {name: '04d', icon: 'wi-cloudy'},
      {name: '04n', icon: 'wi-cloudy'},
      {name: '09d', icon: 'wi-rain'},
      {name: '09n', icon: 'wi-rain'},
      {name: '10d', icon: 'wi-day-rain'},
      {name: '10n', icon: 'wi-night-rain'},
      {name: '11d', icon: 'wi-thunderstorm'},
      {name: '11n', icon: 'wi-thunderstorm'},
      {name: '13d', icon: 'wi-snow'},
      {name: '13n', icon: 'wi-snow'},
      {name: '50d', icon: 'wi-showers'},
      {name: '50n', icon: 'wi-showers'}
    ];

    $scope.fetch = function(searchWord) {

      // Send searchWord to getWeatherData services
      weatherData.getWeatherData(searchWord).then(function (data) {

        // Assign result of the API to a scope variable
        $scope.searchReturn = data;
      });
    };

    $scope.fetch('Dublin, IE');

    // Search typed characters in a most common cities list to avoid overloading API with requests
    $http.get('assets/common-cities.json').then(function (response) {
        $scope.commonCities = response.data.cities;
      });

    // Apply icons conform weather retrived in the API
    $scope.getWeatherIcon = function(weather) {
      var equivalentWeather = $filter('filter')(weatherStatusIcons, {name: weather});
      return equivalentWeather[0].icon;
    };

    $scope.seeDetails = function (index) {
      localStorage.setItem('card', index);
      $location.path('/day-detail/' + index);
    };

  });
