'use strict';

import TableFondos from '../table-fondos';

describe('TableFondos View', function() {

  beforeEach(() => {
    this.tableFondos = new TableFondos();
  });

  it('Should run a few assertions', () => {
    expect(this.tableFondos).toBeDefined();
  });

});
