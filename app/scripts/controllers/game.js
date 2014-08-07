'use strict';

(function () {

  /* @ngInject */
  function GameController($scope, $window, Board) {

    var board ;
    this.rows = 9;
    this.cols = 9;
    this.mines = 10;


    this.startGame = function () {
      board = new Board(this.rows, this.cols, this.mines);
      this.getRows();
    };

    function revealAll(){
      for (var i = 0; i < board.length; i++){
        for (var j = 0; j < board[0].length; j++){
          board.getCell(i, j).reveal();
        }
      }
    }

    function checkGameState() {
      if (board.state === 'win'){
        popMessage('You Rock!');
        revealAll();
      }else if (board.state === 'lose'){
        popMessage('Loser!');
      }
    }
    function popMessage(msg) {
      $window.alert(msg);
    }

    this.getRows = function () {
      var arr = [];
      for (var i = 0; i < this.rows; i++) {
        arr.push(board.getRow(i));
      }
      this.rowsArr = arr;
    };
    this.reveal = function (cell) {
      if (board.state === 'win' || board.state === 'lose'){
        return;
      }
      board.reveal(cell);
      checkGameState();
    };
    //this.startGame(9, 9, 10);
  }

  angular
    .module('minesweeperGameAppInternal')
    .controller('GameController', GameController);

})();
