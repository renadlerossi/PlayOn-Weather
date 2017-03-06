'use strict';

/**
 * @ngdoc function
 * @name playOnWeatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the playOnWeatherApp
 */
angular.module('playOnWeatherApp')
  .controller('MainCtrl', function ($scope, $http, $filter, $location, weatherData) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // Get current date
    $scope.actualDate = new Date();

    // Create array for 16 days date
    $scope.cardsDate = [];

    // Set weekdays - API doesn't have that information
    var weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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

      // Clean local storage if user searched before
      if (localStorage) {
        localStorage.removeItem('search');
        localStorage.removeItem('card');
      }

      // Call API services to retrieve data
      weatherData.getWeatherData(searchWord).then(function (data) {
        $scope.searchReturn = data;

        // Set Local Storage to be used in the second view
        localStorage.setItem('search', $scope.searchReturn.city.name + ', ' + $scope.searchReturn.city.country);

        // Calculate date and weekdays for the 16 days forecast
        angular.forEach($scope.searchReturn.list, function (value, index) {
          var monthDay = $scope.actualDate.getDate() + index;
          var weekDay = weekDays[((monthDay + 1) % 7)];
          var cardDate = weekDay + ' ' + monthDay;
          $scope.cardsDate.push(cardDate);
        });
      });
    };

    $scope.fetch('Dublin, IE');

    // Search typed varters in a most common cities list to avoid overloading API with requests
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
