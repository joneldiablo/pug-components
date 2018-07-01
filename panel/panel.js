'use strict';

export default class Panel {
  constructor($, queryElement) {
    this.name = 'panel';
    $(queryElement).slideReveal({
      autoEscape: true,
      overlay: false,
      position: 'left',
      push: false,
      speed: 600,
      top: 132,
      trigger: $('.panel .controls'),
      width: '50%',
      show: function (slider, trigger) {
        // $('#main-content').addClass('offset-5');
        TweenLite.to($('#main-content'), .6, { className: '+=offset-5' });
        $(slider).find('.controls span').fadeIn();
        $(slider).find('.controls i').removeClass('principal-arrow-right').addClass('principal-cross');
        TweenLite.to($(slider).find('.trigger'), .6, { right: 0 });
      },
      shown: function (slider, trigger) {
        $(slider).find('.trigger').removeClass('bg-primary');
      },
      hide: function (slider, trigger) {
        // $('#main-content').removeClass('offset-5');
        TweenLite.to($('#main-content'), .6, { className: '-=offset-5' });
        $(slider).find('.controls span').fadeOut();
        $(slider).find('.controls i').addClass('principal-arrow-right').removeClass('principal-cross');
        TweenLite.to($(slider).find('.trigger'), .6, { right: -170 });
        $(slider).find('.trigger').addClass('bg-primary');
      }
    }).slideReveal('show');
  }
}
