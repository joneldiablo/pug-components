'use strict';

import DemoBackImage from '../demo-back-image';

describe('DemoBackImage View', function() {

  beforeEach(() => {
    this.demoBackImage = new DemoBackImage();
  });

  it('Should run a few assertions', () => {
    expect(this.demoBackImage).toBeDefined();
  });

});
