'use strict';

import DemoPrincipal from '../demo-principal';

describe('DemoPrincipal View', function() {

  beforeEach(() => {
    this.demoPrincipal = new DemoPrincipal();
  });

  it('Should run a few assertions', () => {
    expect(this.demoPrincipal).toBeDefined();
  });

});
