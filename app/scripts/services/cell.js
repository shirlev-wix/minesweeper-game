'use strict';

(function () {

  /* @ngInject */
  function cellFactory() {

    function Cell() {
      this.value = 0;
      this.hasFlag = false;
      this.isRevealed = false;
    }

    // Service logic
    // ...

    // Public API here
    Cell.prototype.toggleFlag = function () {
      this.hasFlag = !this.hasFlag;
    };

    Cell.prototype.reveal = function () {
      this.isRevealed = !this.isRevealed;
    };

    Cell.prototype.isMine = function () {
      return this.value === -1;
    };

    Cell.prototype.setMine = function () {
      this.value = -1;
    };

    return Cell;
  }

  angular
    .module('minesweeperGameAppInternal')
    .factory('Cell', cellFactory);

})();
