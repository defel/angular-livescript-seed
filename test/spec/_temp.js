describe('app', function() {

  var module; 

  beforeEach(function() {
    module = angular.module('myApp');
  });

  it('should exist', function() {
    expect(module).toBeDefined();
  });
});
