'use strict';

describe('Service: minePlanter', function () {

  var spyIsMine, spySetMine;
  // load the service's module
  beforeEach(function () {
    module('minesweeperGameAppInternal');

    //add your mocks here
    spyIsMine = jasmine.createSpy('spyIsMine').andCallFake(function (value) {
      return value === -1;
    });

    spySetMine = jasmine.createSpy('spySetMine').andReturn(-1);
  });

  // instantiate service
  var minePlanter;
  var boardContentMock;

  function CellMock() {
    this.value = 0;
    this.isMine = function () {
      return spyIsMine(this.value);
    };
    this.setMine = function () {
      this.value = spySetMine();
    };
  }

  function createMock(rows, cols) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
      arr.push([]);
      for (var j = 0; j < cols; j++) {
        arr[i].push(new CellMock());
      }
    }
    return arr;
  }

  beforeEach(inject(function (_minePlanter_) {
    minePlanter = _minePlanter_;
    boardContentMock = createMock(3, 3);
  }));

  it('should plant a single mine on the board', function () {
    minePlanter.plant(boardContentMock, 2);
    expect(spySetMine.calls.length).toEqual(2);
  });

  it('should\'nt plant two mines in the same place', function () {
    var counter = 0, fakeRandomIndexes = [0, 0, 0, 0, 1, 0];
    minePlanter.randomize = jasmine.createSpy().andCallFake(function () {
      return fakeRandomIndexes[counter++];
    });
    minePlanter.plant(boardContentMock, 2);
    expect(spySetMine.calls.length).toEqual(2);
    expect(spyIsMine.calls.length).toEqual(3);
  });

});
