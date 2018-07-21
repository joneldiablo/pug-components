'use strict';

import Cell from '../cell';

describe('Cell View', function() {

  beforeEach(() => {
    this.cell = new Cell();
  });

  it('Should run a few assertions', () => {
    expect(this.cell).toBeDefined();
  });

});
