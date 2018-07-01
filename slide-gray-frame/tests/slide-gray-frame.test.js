'use strict';

import SlideGrayFrame from '../slide-gray-frame';

describe('SlideGrayFrame View', function() {

  beforeEach(() => {
    this.slideGrayFrame = new SlideGrayFrame();
  });

  it('Should run a few assertions', () => {
    expect(this.slideGrayFrame).toBeDefined();
  });

});
