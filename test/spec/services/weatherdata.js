'use strict';

describe('Service: weatherData', function () {
  var httpBackend;
  var rootScope;

  // Mock data
  var mockWeatherData = {"city":{"id":2964574,"name": "foo" ,"coord":{"lon":-6.26719,"lat":53.34399},"country": "bar","population":0},"cod":"200","message":0.0102,"cnt":16,"list":[{"dt":1488888000,"temp":{"day":6.62,"min":5.47,"max":10.35,"night":10.35,"eve":9.83,"morn":5.47},"pressure":1020.78,"humidity":100,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"speed":11.47,"deg":164,"clouds":92,"rain":5.06},{"dt":1488974400,"temp":{"day":9.86,"min":8.21,"max":10.17,"night":8.41,"eve":9.46,"morn":8.51},"pressure":1022.02,"humidity":91,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":7.56,"deg":264,"clouds":56,"rain":1.26},{"dt":1489060800,"temp":{"day":11.68,"min":9.93,"max":11.68,"night":9.93,"eve":11.04,"morn":10.47},"pressure":1020.67,"humidity":84,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":7.41,"deg":228,"clouds":64,"rain":0.77},{"dt":1489147200,"temp":{"day":10.38,"min":9.6,"max":10.38,"night":9.6,"eve":9.87,"morn":10.27},"pressure":1001.06,"humidity":0,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"speed":13.04,"deg":221,"clouds":41,"rain":3.51},{"dt":1489233600,"temp":{"day":9.42,"min":8.58,"max":10.51,"night":8.58,"eve":10.51,"morn":8.93},"pressure":999.72,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":16.28,"deg":261,"clouds":52,"rain":1.62},{"dt":1489320000,"temp":{"day":8.15,"min":6.9,"max":9.33,"night":8.27,"eve":9.33,"morn":6.9},"pressure":1034.68,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":5.8,"deg":311,"clouds":9,"rain":0.58},{"dt":1489406400,"temp":{"day":10.49,"min":7.51,"max":11.12,"night":7.51,"eve":11.12,"morn":9.16},"pressure":1031.2,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":7.13,"deg":231,"clouds":83,"rain":1.71},{"dt":1489492800,"temp":{"day":10.85,"min":7.28,"max":11.95,"night":8.98,"eve":11.95,"morn":7.28},"pressure":1033.68,"humidity":0,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"speed":8.5,"deg":243,"clouds":1},{"dt":1489579200,"temp":{"day":10.42,"min":9.75,"max":11.61,"night":9.75,"eve":11.61,"morn":10.35},"pressure":1032.56,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":8.35,"deg":240,"clouds":70,"rain":0.84},{"dt":1489665600,"temp":{"day":8.86,"min":6.84,"max":9.06,"night":8.81,"eve":9.06,"morn":6.84},"pressure":1022.45,"humidity":0,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"speed":16.34,"deg":283,"clouds":81,"rain":3.05},{"dt":1489752000,"temp":{"day":10.46,"min":8.82,"max":11.28,"night":9.91,"eve":11.28,"morn":8.82},"pressure":1032.07,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":8.88,"deg":289,"clouds":50,"rain":0.55},{"dt":1489838400,"temp":{"day":10.62,"min":8.65,"max":10.62,"night":8.65,"eve":10.21,"morn":10.17},"pressure":1026.8,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":9.09,"deg":288,"clouds":78,"rain":0.65},{"dt":1489924800,"temp":{"day":10.55,"min":8.29,"max":11.34,"night":9.78,"eve":11.34,"morn":8.29},"pressure":1032.83,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":2.33,"deg":247,"clouds":13,"rain":0.32},{"dt":1490011200,"temp":{"day":10.03,"min":8.14,"max":10.03,"night":8.14,"eve":9.98,"morn":8.87},"pressure":1033.19,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":2.83,"deg":215,"clouds":43},{"dt":1490097600,"temp":{"day":9.44,"min":7.37,"max":9.79,"night":7.37,"eve":9.79,"morn":8.21},"pressure":1024.78,"humidity":0,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"speed":6.27,"deg":176,"clouds":95,"rain":5.21},{"dt":1490184000,"temp":{"day":7.37,"min":7.37,"max":7.37,"night":7.37,"eve":7.37,"morn":7.37},"pressure":1028.12,"humidity":0,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"speed":9.36,"deg":328,"clouds":92,"rain":3.63}]};

  // Mock search words
  var searchWordCity = '';
  var searchWordCountry = '';
  var searchSelect = searchWordCity + ', ' + searchWordCountry;

  // load the service's module
  beforeEach(module('playOnWeatherApp'));

  // instantiate service
  var weatherData;
  beforeEach(inject(function (_weatherData_, $httpBackend, $rootScope) {
    weatherData = _weatherData_;
    httpBackend = $httpBackend;
    rootScope = $rootScope;

  }));

  it('should return data with same city name and country - query with search word', function () {
    // Assign search words
    searchWordCity = 'foo';
    searchWordCountry = 'bar';

    weatherData.getWeatherData(searchSelect).then(function(storedData) {
      expect(storedData.city.name).toEqual(mockWeatherData.city.name);
      expect(storedData.city.country).toEqual(mockWeatherData.city.country);
    });
  });

  it('should return stored data from localstorage', function () {

    weatherData.getWeatherData().then(function (storedData) {
      expect(storedData).toEqual(mockWeatherData);
    });
  });

  it('should return a rejected promise if no storedData', function () {
    weatherData.setData('');
    var rejected = false;
    weatherData.getWeatherData().catch(function () {
      rejected = true;
    });
    rootScope.$digest();
    expect(rejected).toBe(true);
  });

});
