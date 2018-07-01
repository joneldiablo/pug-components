'use strict';

import TableAfore from '../table-afore';

describe('TableAfore View', function() {

  beforeEach(() => {
    this.tableAfore = new TableAfore();
  });

  it('Should run a few assertions', () => {
    expect(this.tableAfore).toBeDefined();
  });

});
