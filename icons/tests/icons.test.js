'use strict';

import Icons from '../icons';

describe('Icons View', function() {

  beforeEach(() => {
    this.icons = new Icons();
  });

  it('Should run a few assertions', () => {
    expect(this.icons).toBeDefined();
  });

});
