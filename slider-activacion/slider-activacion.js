'use strict';

export default class SliderActivacion {
  constructor() {
    this.name = 'slider-activacion';
    $('.owl-carousel.slider-activacion').owlCarousel({
      autoplay: true,
      autoplayHoverPause: true,
      autoplayTimeout: 6000,
      items: 1,
      loop: true,
      margin: 20
    });
  }
}
