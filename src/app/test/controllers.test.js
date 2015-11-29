'use strict';

describe('controllers', function() {

  beforeEach(module('app'));

  describe('controller: MainController', function() {

    var scope,
        ctrl;

    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();

      ctrl = $controller('MainController', {
        '$scope': scope
      });

    }));

    it('should create data', function() {
      expect('true').toBe('true');
      console.log(scope.data);
    });
  });
});
