'use strict';

describe('Service: iconDeliver', function () {

  // load the service's module
  beforeEach(module('playOnWeatherApp'));

  // instantiate service
  var iconDeliver;
  beforeEach(inject(function (_iconDeliver_) {
    iconDeliver = _iconDeliver_;
  }));

  it('should do something', function () {
    expect(!!iconDeliver).toBe(true);
  });

});
