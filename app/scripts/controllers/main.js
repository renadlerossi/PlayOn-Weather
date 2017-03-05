'use strict';

/**
 * @ngdoc function
 * @name playOnWeatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the playOnWeatherApp
 */
angular.module('playOnWeatherApp')
  .controller('MainCtrl', function ($scope, $http, $filter) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.actualDate = new Date();
    $scope.cardsDate = [];
    let weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let weatherStatusStyles = [
      {name: '01d', class: 'wi-day-sunny', background: ''},
      {name: '01n', class: 'wi-night-clear', background: ''},
      {name: '02d', class: 'wi-day-cloudy', background: ''},
      {name: '02n', class: 'wi-night-alt-cloudy', background: ''},
      {name: '03d', class: 'wi-day-rain-mix', background: ''},
      {name: '03n', class: 'wi-night-alt-showers', background: ''},
      {name: '04d', class: 'wi-cloudy', background: ''},
      {name: '04n', class: 'wi-cloudy', background: ''},
      {name: '09d', class: 'wi-rain', background: ''},
      {name: '09n', class: 'wi-rain', background: ''},
      {name: '10d', class: 'wi-day-rain', background: ''},
      {name: '10n', class: 'wi-night-rain', background: ''},
      {name: '11d', class: 'wi-thunderstorm', background: ''},
      {name: '11n', class: 'wi-thunderstorm', background: ''},
      {name: '13d', class: 'wi-snow', background: ''},
      {name: '13n', class: 'wi-snow', background: ''},
      {name: '50d', class: 'wi-showers', background: ''},
      {name: '50n', class: 'wi-showers', background: ''}
    ];


    $scope.fetch = function() {
      if ($scope.search) {
        let cleanSearchWord = $scope.search.name.split(' ').join('');
        apiCall(cleanSearchWord);
      } else {
        apiCall('Dublin, IE');
      }
    };

    $scope.fetch();

    function apiCall(query) {
      $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + query + '&units=metric&cnt=16&APPID=e57b113884f4ac1565de77e3b580388c')
        .then(function (response) {
          $scope.searchReturn = response.data;
          angular.forEach($scope.searchReturn.list, function (value, index) {
            let monthDay = $scope.actualDate.getDate() + index;
            let weekDay = weekDays[((monthDay + 1) % 7)];
            let cardDate = weekDay + ' ' + monthDay;
            $scope.cardsDate.push(cardDate);
          });
        });
    }

    $http.get('assets/common-cities.json').then(function (response) {
        $scope.commonCities = response.data.cities;
      });

    $scope.getWeatherIcon = function(weather) {
      let newIcon = $filter('filter')(weatherStatusStyles, {name: weather});
      return newIcon[0].class;
    };

  });
