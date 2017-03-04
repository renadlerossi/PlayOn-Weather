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

    $scope.actualDate = new Date();
    $scope.cardsDate = [];
    $scope.weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


    $scope.fetch = function() {
      if ($scope.search) {
        var cleanSearchWord = $scope.search.name.split(' ').join('');
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
            var monthDay = $scope.actualDate.getDate() + index;
            var weekDay = $scope.weekDays[((monthDay + 1) % 7)];
            var cardDate = weekDay + ' ' + monthDay;
            $scope.cardsDate.push(cardDate);
            console.log(monthDay);
          });
        });
    }

    $http.get('assets/common-cities.json').then(function (response) {
        $scope.commonCities = response.data.cities;
      });

  });
