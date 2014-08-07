'use strict';

describe('Directive: rightClick', function () {

  // load the directive's module
  beforeEach(function () {
    module('minesweeperGameAppInternal');

    //add your mocks here
  });

  var element, func1, func2,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    $rootScope.function1 = function () {
      func1 = true;
    };
    $rootScope.function2 = function () {
      func2 = true;
    };
    func1 = false;
    func2 = false;
  }));

  it('should add right click behaviour which will activate function1', inject(function ($compile) {
    element = angular.element('<div right-click="function1()"></div>');
    element = $compile(element)(scope);
    element.triggerHandler('contextmenu');
    expect(func1).toBe(true);
    expect(func2).toBe(false);
  }));
  it('should add right click behaviour which will activate function2', inject(function ($compile) {
    element = angular.element('<div right-click="function2()"></div>');
    element = $compile(element)(scope);
    element.triggerHandler('contextmenu');
    expect(func1).toBe(false);
    expect(func2).toBe(true);
  }));
});
