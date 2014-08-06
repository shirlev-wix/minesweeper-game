'use strict';

describe('Service: cell', function () {

  var neighboursMock;

  // load the service's module
  beforeEach(function () {
    module('minesweeperGameAppInternal');

    //add your mocks here
  });

  // instantiate service
  var Cell, cell;
  beforeEach(inject(function (_Cell_) {
    Cell = _Cell_;
    cell = new Cell();
  }));

  it('should create empty cell', function () {
    expect(cell).toBeDefined();
  });
  it('should be initialized with value 0', function () {
    expect(cell.value).toBe(0);
  });
  it('should be initialized with no flag', function () {
    expect(cell.hasFlag).toBe(false);
  });
  it('should be initialized as not revealed', function () {
    expect(cell.isRevealed).toBe(false);
  });

  it('should toggle flag', function () {
    cell.toggleFlag();
    expect(cell.hasFlag).toBe(true);
    cell.toggleFlag();
    expect(cell.hasFlag).toBe(false);
  });
  it('should reveal cell', function () {
    cell.reveal();
    expect(cell.isRevealed).toBe(true);
  });
  it('should return true iff cell with mine', function () {
    expect(cell.isMine()).toBe(false);
  });
  it('should set cell value to mine', function () {
    cell.setMine();
    expect(cell.isMine()).toBe(true);
  });
  it('should set cell value according to #neighbours which are mines', function () {
    neighboursMock = [new Cell()];
    neighboursMock[0].setMine();
    cell.calcVal(neighboursMock);
    expect(cell.value).toBe(1);
  });

});
