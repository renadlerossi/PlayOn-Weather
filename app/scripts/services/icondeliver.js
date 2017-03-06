'use strict';

/**
 * @ngdoc service
 * @name playOnWeatherApp.iconDeliver
 * @description
 * # iconDeliver
 * Service in the playOnWeatherApp.
 */
angular.module('playOnWeatherApp')
  .service('iconDeliver', function () {

    var _this = this;

    // Map Icons
    _this.weatherStatusIcons = [
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

  });
