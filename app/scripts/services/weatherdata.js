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

    var _this = this;


    // Store response in local storage to avoid calling the API again
    _this.setData = function (data) {
      localStorage.setItem('data', JSON.stringify(data));
      storedData = data;
    };

    // Retrieve data in local storage
    _this.getData = function () {
      return storedData || JSON.parse(localStorage.getItem('data'));
    };

    // Get the weather data
    _this.getWeatherData = function(searchWord) {
      return $q(function (resolve, reject) {

        // If the call was initialize by a search in the input
        if (searchWord) {

          // Remove blank spaces from searchWord
          var cleanSearchWord = searchWord.split(' ').join('');

          // Call API
          $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + cleanSearchWord + '&units=metric&cnt=16&APPID=e57b113884f4ac1565de77e3b580388c')
            .then(function (response) {
              _this.setData(response.data);
              resolve(response.data);
            }, function () {
              reject();
            });

        // If the call was made in sub page
        } else if (_this.getData()) {
          resolve(_this.getData());
        } else {
          reject();
        }
      });

    };

  });
