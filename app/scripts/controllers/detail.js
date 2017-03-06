'use strict';

/**
 * @ngdoc function
 * @name playOnWeatherApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the playOnWeatherApp
 */
angular.module('playOnWeatherApp')
  .controller('DetailCtrl',  function ($scope, weatherData) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // Get current date
    $scope.actualDate = new Date();

    let oldSearchword = localStorage.getItem('search');

    loadResults(oldSearchword);

    function loadResults(query) {
      weatherData.apiCall(query).then(function (response) {
        $scope.searchReturn = response.data;
      });
    }


  });
