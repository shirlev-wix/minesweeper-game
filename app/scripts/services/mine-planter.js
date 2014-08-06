'use strict';

(function () {

  /* @ngInject */
  function MinePlanter() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    // Public API here
    this.MINE = -1;

    this.plant = function (content, nMines) {
      while (nMines--) {
        this.plantSingleMine(content);
      }
    };

    this.plantSingleMine = function (content) {
      var i, j;
      do {
        i = this.randomize(content.length);
        j = this.randomize(content[0].length);
      }
      while (content[i][j].isMine());
      content[i][j].setMine();
    };

    this.randomize = function (maxNum) {
      return Math.floor((Math.random() * maxNum));
    };
  }

  angular
    .module('minesweeperGameAppInternal')
    .service('minePlanter', MinePlanter);

})();
