'use strict';

(function () {

  /* @ngInject */
  function boardFactory(minePlanter, Cell) {

    function createRow(length) {
      var arr = [], i = length;
      while (i--) {
        arr[i] = new Cell();
      }
      return arr;
    }

    function initialize(content, nRows, nCols) {
      var i = nRows;
      while (i--) {
        content.push(createRow(nCols));
      }
    }

    function outOfRange(index, size) {
      return index < 0 || index >= size;
    }

    function Board(nRows, nCols, nMines) {
      if (nRows * nCols < nMines) {
        throw new Error('Too many mines for board from size: ' + nRows + ' X ' + nCols);
      }
      this.content = [];
      initialize(this.content, nRows, nCols);
      minePlanter.plant(this.content, nMines || 0);
      this.calcCellsValues();
    }
    // Service logic
    // ...

    // Public API here
    Board.prototype.calcCellsValues = function () {
      var neighbours, current;
      for (var i = 0; i < this.content.length; i++) {
        for (var j = 0; j < this.content[0].length; j++) {
          neighbours = this.calcNeighbours(i, j);
          current = this.content[i][j];
          if (!current.isMine()) {
            current.calcVal(neighbours);
          }
        }
      }
    };

    Board.prototype.getCell = function (row, col) {
      return this.content[row][col];
    };

    Board.prototype.getRow = function (row) {
      return this.content[row];
    };

    Board.prototype.getCol = function (col) {
      return this.content.map(function (row) { return row[col]; });
    };

    Board.prototype.reveal = function (cell) {
      if (cell.isRevealed) {
        return;
      } else if (cell.isMine()) {
        return 0;
      } else {
        cell.reveal();
      }
      if (cell.value === 0) {
        for (var i = 0; i < cell.neighbours.length; i++) {
          this.reveal(cell.neighbours[i]);
        }
      }
    };

    function checkRange(matrix, i, row, j, col) {
      return outOfRange(i + row, matrix.length) || outOfRange(j + col, matrix[0].length);
    }

    function sameIndex(row, col) {
      return row === 0 && col === 0;
    }

    function addNeighbour(neighbours, i, row, j, col) {
      neighbours.push(this.getCell(i + row, j + col));
    }

    Board.prototype.calcNeighbours = function (i, j) {
      var neighbours = [];
      for (var row = -1; row < 2; row++) {
        for (var col = -1; col < 2; col++) {
          if (sameIndex(row, col)) {
            continue;
          } else if (checkRange(this.content, i, row, j, col)) {
            continue;
          } else {
            addNeighbour.call(this, neighbours, i, row, j, col);
          }
        }
      }
      this.getCell(i, j).neighbours = neighbours;
      return neighbours;
    };

    Board.EMPTY_CELL = 0;

    return Board;
  }

  angular
    .module('minesweeperGameAppInternal')
      .factory('Board', boardFactory);

})();
