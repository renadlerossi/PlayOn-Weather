'use strict';

/**
 * @ngdoc service
 * @name playOnWeatherApp.weatherData
 * @description
 * # weatherData
 * Service in the playOnWeatherApp.
 */
angular.module('playOnWeatherApp')
  .service('weatherData', function ($http) {

    // API Call
    this.apiCall = function(searchWord) {
      let cleanSearchWord = searchWord.split(' ').join('');
      return $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + cleanSearchWord + '&units=metric&cnt=16&APPID=e57b113884f4ac1565de77e3b580388c');
    };

  });
