'use strict';

(function () {

  /* @ngInject */
  function cellFactory() {

    function Cell() {
      this.value = 0;
      this.hasFlag = false;
      this.isRevealed = false;
      this.neighbours = [];
    }

    // Service logic
    // ...

    // Public API here
    Cell.prototype.toggleFlag = function () {
      if (!this.isRevealed){
        this.hasFlag = !this.hasFlag;
      }
    };

    Cell.prototype.reveal = function () {
      this.isRevealed = true;
      this.hasFlag = false;
    };

    Cell.prototype.isEmpty = function () {
      return this.value === 0;
    };

    Cell.prototype.isMine = function () {
      return this.value === -1;
    };

    Cell.prototype.setMine = function () {
      this.value = -1;
    };

    Cell.prototype.calcVal = function () {
      var neighbours = this.neighbours;
      var arr = neighbours.filter(function (cell) {
        return cell.isMine();
      });
      this.value = arr.length;
    };

    return Cell;
  }

  angular
    .module('minesweeperGameAppInternal')
    .factory('Cell', cellFactory);

})();
