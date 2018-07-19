'use strict';

export default class SliderHelpful {
  constructor($, queryElement, settings) {
    this.name = 'slider-helpful';
    let $element = this.$element = $(queryElement);
    let that = this;
    $element.owlCarousel({
      autoplay: true,
      autoplayHoverPause: true,
      autoplayTimeout: 6000,
      items: 1,
      loop: true,
      margin: 20
    });
    that.resize();
    $(window).resize(function () {
      that.resize();
    });
  }
  resize() {
    let that = this;
    setTimeout(() => {
      that.$element.trigger('refresh.owl.carousel');
    }, 801);
  }
}
