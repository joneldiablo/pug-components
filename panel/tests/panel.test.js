'use strict';

import Panel from '../panel';

describe('Panel View', function() {

  beforeEach(() => {
    this.panel = new Panel();
  });

  it('Should run a few assertions', () => {
    expect(this.panel).toBeDefined();
  });

});
