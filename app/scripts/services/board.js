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

    function Board(nRows, nCols, nMines) {
      if (nRows * nCols < nMines) {
        throw new Error('Too many mines for board from size: ' + nRows + ' X ' + nCols);
      }
      this.content = [];
      initialize(this.content, nRows, nCols);
      minePlanter.plant(this.content, nMines || 0);
    }
    // Service logic
    // ...

    // Public API here
    Board.prototype.getCell = function (row, col) {
      return this.content[row][col];
    };

    Board.prototype.getRow = function (row) {
      return this.content[row];
    };

    Board.prototype.getCol = function (col) {
      return this.content.map(function (row) { return row[col]; });
    };

    Board.EMPTY_CELL = 0;

    return Board;
  }

  angular
    .module('minesweeperGameAppInternal')
      .factory('Board', boardFactory);

})();
