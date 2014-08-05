'use strict';

describe('Service: minePlanter', function () {

  // load the service's module
  beforeEach(function () {
    module('minesweeperGameAppInternal');

    //add your mocks here

  });

  // instantiate service
  var minePlanter;
  var boardContentMock;
  function countMines(boardContent) {
    var counter = 0;
    boardContent.map(function (row) {
      row.map(function (member) {
        if (member === -1) {
          counter++;
        }
      });
    });
    return counter;
  }

  beforeEach(inject(function (_minePlanter_) {
    minePlanter = _minePlanter_;
  }));

  it('should plant a single mine on the board', function () {
    boardContentMock = [[0, 0], [0, 0], [0, 0]];
    minePlanter.plant(boardContentMock, 2);
    var counter = countMines(boardContentMock);
    expect(counter).toEqual(2);
  });

  it('should\'nt plant two mines in the same place', function () {
    boardContentMock = [[0, 0], [0, 0], [0, 0]];
    var counter = 0, fakeRandomIndexes = [0, 0, 0, 0, 1, 0];
    spyOn(minePlanter, 'randomize').andCallFake(function () {
      return fakeRandomIndexes[counter++];
    });
    minePlanter.plant(boardContentMock, 2);
    expect(countMines(boardContentMock)).toEqual(2);
  });

});
