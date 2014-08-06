'use strict';

describe('Service: board', function () {

  var board, neighbours;
  // load the service's module
  beforeEach(function () {
    module('minesweeperGameAppInternal');

    //add your mocks here
  });

  // instantiate service
  var Board;

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
  describe('board.calcNeighbours(i, j)', function () {

    beforeEach(function () {
      board = new Board(3, 3);
    });

    it('should set neighbours for the cell and also return them', function () {
      var neighbours = board.calcNeighbours(1, 1);
      expect(neighbours).toBe(board.getCell(1, 1).neighbours);
    });
    it('should return an array with 3 cell-neighbours for corner cell', function () {
      neighbours = board.calcNeighbours(0, 0);
      expect(neighbours.length).toEqual(3);
      expect(neighbours[0]).toBe(board.getCell(0, 1));
      expect(neighbours[1]).toBe(board.getCell(1, 0));
      expect(neighbours[2]).toBe(board.getCell(1, 1));
    });
    it('should return an array with 5 cell-neighbours for side cell', function () {
      neighbours = board.calcNeighbours(1, 0);
      expect(neighbours.length).toEqual(5);
      expect(neighbours[0]).toBe(board.getCell(0, 0));
      expect(neighbours[1]).toBe(board.getCell(0, 1));
      expect(neighbours[2]).toBe(board.getCell(1, 1));
      expect(neighbours[3]).toBe(board.getCell(2, 0));
      expect(neighbours[4]).toBe(board.getCell(2, 1));
    });
    it('should return an array with 8 cell-neighbours for middle cell', function () {
      neighbours = board.calcNeighbours(1, 1);
      expect(neighbours.length).toEqual(8);
      expect(neighbours[0]).toBe(board.getCell(0, 0));
      expect(neighbours[1]).toBe(board.getCell(0, 1));
      expect(neighbours[2]).toBe(board.getCell(0, 2));
      expect(neighbours[3]).toBe(board.getCell(1, 0));
      expect(neighbours[4]).toBe(board.getCell(1, 2));
      expect(neighbours[5]).toBe(board.getCell(2, 0));
      expect(neighbours[6]).toBe(board.getCell(2, 1));
      expect(neighbours[7]).toBe(board.getCell(2, 2));
    });
    it('should do nothing for invalid indexes', function () {
      neighbours = board.calcNeighbours(1, 1);
      expect(neighbours).toBe(board.getCell(1, 1).neighbours);
    });
  });

  describe('board.reveal(i, j)', function () {

//    var counter, fakeRandomIndexes = [0, 2, 2, 2];
//    function fakeRandom() {
//     return fakeRandomIndexes[counter++];
//    }

    beforeEach(function () {
      board = new Board(3, 3);
      board.getCell(0, 2).setMine();
      board.getCell(2, 2).setMine();
      board.calcCellsValues();
    });

    it('should reveal only current cell if it has positive non-mine value', function () {
      board.reveal(board.getCell(1, 2));
      expect(board.getCell(1, 2).isRevealed).toEqual(true);
      expect(board.getCell(0, 0).isRevealed).toEqual(false);
    });
    it('should return 0 (end game) if we revealed a mine', function () {
      expect(board.reveal(board.getCell(0, 2))).toEqual(0);
    });
    it('should\'nt reveal a cell which is already revealed', function () {
      board.reveal(board.getCell(1, 2));
      board.reveal(board.getCell(1, 2));
      expect(board.getCell(1, 2).isRevealed).toEqual(true);
    });
    it('should reveal neighbours recursively if the i,j cell is empty and stop when revealing numbers', function () {
      board.reveal(board.getCell(0, 0));
      expect(board.getCell(0, 0).isRevealed).toEqual(true);
      expect(board.getCell(0, 1).isRevealed).toEqual(true);
      expect(board.getCell(1, 0).isRevealed).toEqual(true);
      expect(board.getCell(1, 2).isRevealed).toEqual(false);
    });
  });
});
