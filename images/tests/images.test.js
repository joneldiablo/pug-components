'use strict';

import Images from '../images';

describe('Images View', function() {

  beforeEach(() => {
    this.images = new Images();
  });

  it('Should run a few assertions', () => {
    expect(this.images).toBeDefined();
  });

});
