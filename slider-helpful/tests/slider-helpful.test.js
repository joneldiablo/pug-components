'use strict';

import SliderHelpful from '../slider-helpful';

describe('SliderHelpful View', function() {

  beforeEach(() => {
    this.sliderHelpful = new SliderHelpful();
  });

  it('Should run a few assertions', () => {
    expect(this.sliderHelpful).toBeDefined();
  });

});
