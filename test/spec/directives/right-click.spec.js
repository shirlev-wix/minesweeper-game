'use strict';

describe('Directive: rightClick', function () {

  // load the directive's module
  beforeEach(function () {
    module('minesweeperGameAppInternal');

    //add your mocks here
  });

  var element, called = true,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    $rootScope.myFunction = function() {
      called = true;
    };
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<div right-click></div>');
    element = $compile(element)(scope);
    element.triggerHandler('contextmenu');
    expect(called).toBe(true);
  }));
});
