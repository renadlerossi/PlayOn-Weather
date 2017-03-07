'use strict';

/**
 * @ngdoc service
 * @name playOnWeatherApp.forecastDaysCalc
 * @description
 * # forecastDaysCalc
 * Service in the playOnWeatherApp.
 */
angular.module('playOnWeatherApp')
  .service('forecastDaysCalc', ['weatherData', function (weatherData) {

    var _this = this;

    // Get current date
    _this.currentDate = new Date();

    // Set weekdays - API doesn't have that information
    _this.weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Create array for 16 days date
    _this.cardsDate = [];

    // Retrieve data in local storage
    function loadData() {
      weatherData.getWeatherData().then(function (data) {
        _this.data = data;

        // Calculate date and weekdays for the 16 days forecast
        angular.forEach(_this.data.list, function (value, index) {
          var monthDay = _this.currentDate.getDate() + index;
          var weekDay = _this.weekDays[((monthDay + 1) % 7)];
          var cardDate = weekDay + ' ' + monthDay;
          _this.cardsDate.push(cardDate);
        });
      });
    }

    loadData();

  }]);
