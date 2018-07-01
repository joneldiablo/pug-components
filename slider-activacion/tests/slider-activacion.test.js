'use strict';

import SliderActivacion from '../slider-activacion';

describe('SliderActivacion View', function() {

  beforeEach(() => {
    this.sliderActivacion = new SliderActivacion();
  });

  it('Should run a few assertions', () => {
    expect(this.sliderActivacion).toBeDefined();
  });

});
