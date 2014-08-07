'use strict';

describe('Controller: GameController', function () {

  // load the controller's module
  beforeEach(function () {
    module('minesweeperGameAppInternal');

    //add your mocks here
  });

  var GameController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GameController = $controller('GameController', {
      $scope: scope
    });
    GameController.startGame(5, 5, 10);
  }));

  it('should return array of board rows', function () {
    var arr = GameController.getRows();
    expect(arr.length).toEqual(5);
    expect(arr[0].length).toEqual(5);
    expect(arr[1].length).toEqual(5);
    expect(arr[2].length).toEqual(5);
    expect(arr[3].length).toEqual(5);
    expect(arr[4].length).toEqual(5);
  });
});
