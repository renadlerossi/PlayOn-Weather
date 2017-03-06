'use strict';

describe('Service: forecastDaysCalc', function () {

  // load the service's module
  beforeEach(module('playOnWeatherApp'));

  // instantiate service
  var forecastDaysCalc;
  beforeEach(inject(function (_forecastDaysCalc_) {
    forecastDaysCalc = _forecastDaysCalc_;
  }));

  it('should do something', function () {
    expect(!!forecastDaysCalc).toBe(true);
  });

});
