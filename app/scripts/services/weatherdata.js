'use strict';

/**
 * @ngdoc service
 * @name playOnWeatherApp.weatherData
 * @description
 * # weatherData
 * Service in the playOnWeatherApp.
 */
angular.module('playOnWeatherApp')
  .service('weatherData', function ($http, $q) {
    var storedData = null;

    this.setData = function (data) {
      localStorage.setItem('data', JSON.stringify(data));
      storedData = data;
    };

    this.getData = function () {
      return storedData || JSON.parse(localStorage.getItem('data'));
    };

    // API Call
    this.getWeatherData = function(searchWord) {
      var _this = this;
      return $q(function (resolve, reject) {
        if (searchWord) {
          var cleanSearchWord = searchWord.split(' ').join('');
          $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + cleanSearchWord + '&units=metric&cnt=16&APPID=e57b113884f4ac1565de77e3b580388c')
            .then(function (response) {
              _this.setData(response.data);
              resolve(response.data);
            }, function () {
              reject();
            });
        } else if (_this.getData()) {
          resolve(_this.getData());
        } else {
          reject();
        }
      })

    };

  });
