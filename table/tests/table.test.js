'use strict';

import Table from '../table';

describe('Table View', function() {

  beforeEach(() => {
    this.table = new Table();
  });

  it('Should run a few assertions', () => {
    expect(this.table).toBeDefined();
  });

});
