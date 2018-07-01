'use strict';

export default class PanelDemo {
  constructor($, queryElement) {
    this.name = 'panel-demo';
    $(queryElement).slideReveal({
      autoEscape: true,
      overlay: false,
      position: 'right',
      push: false,
      speed: 600,
      top: 132,
      trigger: $('.panel-demo .controls'),
      width: '33.3%',
      show: function (slider, trigger) {
        $(slider).find('.controls i').toggleClass('principal-arrow-left principal-cross');
        $(slider).find('.trigger').css('opacity', 1);
      },
      hide: function (slider, trigger) {
        $(slider).find('.controls i').toggleClass('principal-arrow-left principal-cross');
        $(slider).find('.trigger').css('opacity', .5);
      }
    });
  }
}
