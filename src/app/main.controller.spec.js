describe('Testing MainController', function() {
  'use strict';
  var $controller;
  var $rootScope;
  var $scope;

  var MainController;

  var getData;
  var YouTube;

  //you need to indicate your module in a test
  beforeEach(module('app'));

  beforeEach(inject(function(_$rootScope_, _$controller_, _YouTube_, _getData_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $controller = _$controller_;

    YouTube = _YouTube_;
    getData = _getData_;

    MainController = $controller('MainController', {
      'getData': getData,
      'YouTube': YouTube
    });
  }));

  it('should be defined', function() {
    expect(MainController).toBeDefined();
  });
});
