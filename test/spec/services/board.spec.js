'use strict';

describe('Service: board', function () {

  // load the service's module
  beforeEach(function () {
    module('minesweeperGameAppInternal');

    //add your mocks here
  });

  // instantiate service
  var Board;
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

  beforeEach(inject(function (_Board_) {
    Board = _Board_;
  }));

  it('should create empty board', function () {
    expect(new Board()).toBeDefined();
  });
  it('should return the the i,j cell', inject(function (Cell) {
    expect(new Board(1, 1).getCell(0, 0) instanceof Cell).toBe(true);
  }));
  it('should return row i', function () {
    expect(new Board(10, 7).getRow(6).length).toEqual(7);
  });
  it('should return col j', function () {
    expect(new Board(10, 7).getCol(4).length).toEqual(10);
  });
  it('should throw an error when #mines > board size', function () {
    expect(function () {new Board(2, 2, 5); }).toThrow('Too many mines for board from size: 2 X 2');
  });

  it('should return a board with 2 mines', function () {
    var board = new Board(10, 10, 2);
    expect(countMines(board.content)).toEqual(2);
  });

});
