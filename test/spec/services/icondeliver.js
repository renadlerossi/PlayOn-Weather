'use strict';

describe('Service: iconDeliver', function () {

  // load the service's module
  beforeEach(module('playOnWeatherApp'));

  // instantiate service
  var iconDeliver;
  beforeEach(inject(function (_iconDeliver_) {
    iconDeliver = _iconDeliver_;
  }));

  it('should have 18 icons', function () {
    expect(iconDeliver.weatherStatusIcons.length).toBe(18);
  });

});
