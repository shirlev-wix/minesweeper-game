'use strict';

(function () {

  /* @ngInject */
  function GameController($scope, $window, Board) {

    var board ;
    this.rows = 9;
    this.cols = 9;
    this.mines = 10;
    this.level = {
      beginner: {rows: 9, cols: 9, mines: 10},
      intermediate: {rows: 16, cols: 16, mines: 40},
      expert: {rows: 30, cols: 16, mines: 99}
    };
    this.state = 'initial';

    this.startGame = function () {
      board = new Board(this.rows, this.cols, this.mines);
      this.state = board.state;
      this.getRows();
    };
    this.setLevel = function (lvl) {
      this.rows = this.level[lvl].rows;
      this.cols = this.level[lvl].cols;
      this.mines = this.level[lvl].mines;
    };

    function updateState (self){
      self.state = board.state;
      if (self.isInState('lose')){
        self.msg = 'Loser!';
        revealAll();
      }else if (self.isInState('win')){
        self.msg = 'You rock!';
        revealAll();
      }
    }
    function revealAll(){
      for (var i = 0; i < board.content.length; i++){
        for (var j = 0; j < board.content[0].length; j++){
          board.getCell(i, j).reveal();
        }
      }
    }

//    function popMessage(msg) {
//      $window.alert(msg);
//    }

    this.isInState = function (state) {
      return this.state === state;
    };

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
      updateState(this);
    };
  }

  angular
    .module('minesweeperGameAppInternal')
    .controller('GameController', GameController);

})();
