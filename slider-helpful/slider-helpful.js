'use strict';

export default class SliderHelpful {
  constructor($, queryElement, settings) {
    this.name = 'slider-helpful';
    let $element = this.$element = $(queryElement);
    let $owl = $element.owlCarousel({
      autoplay: true,
      autoplayHoverPause: true,
      autoplayTimeout: 6000,
      items: 1,
      loop: true,
      margin: 20
    });
    setTimeout(() => {
      $owl.trigger('refresh.owl.carousel');
    }, 1000);
  }
}
