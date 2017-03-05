'use strict';

/**
 * @ngdoc function
 * @name playOnWeatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the playOnWeatherApp
 */
angular.module('playOnWeatherApp')
  .controller('MainCtrl', function ($scope, $http, $filter, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.actualDate = new Date();
    $scope.cardsDate = [];
    let weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let weatherStatusIcons = [
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
          console.log($scope.searchReturn);
        });
    }

    $http.get('assets/common-cities.json').then(function (response) {
        $scope.commonCities = response.data.cities;
      });

    $scope.getWeatherIcon = function(weather) {
      let equivalentWeather = $filter('filter')(weatherStatusIcons, {name: weather});
      return equivalentWeather[0].icon;
    };

    $scope.seeDetails = function () {
      $location.path('/day-detail');
    };

  });
