'use strict';

export default class Panel {
  constructor($, queryElement, settings) {
    let slidereveal = settings.slidereveal;
    delete settings.slidereveal;

    let that = this;
    this.name = 'panel';
    this.$ = $;

    this.settings = $.extend({
      collapsable: true,
      slidereveal: $.extend({
        autoEscape: true,
        overlay: false,
        position: 'left',
        push: false,
        speed: 600,
        top: 132,
        trigger: $('.panel .controls'),
        width: '50%',
        show: function () {
          that.show();
        },
        shown: function () {
          that.shown();
        },
        hide: function () {
          that.hide();
        }
      }, slidereveal)
    }, settings);
    $(queryElement).slideReveal(this.settings.slidereveal).slideReveal('show');
  }
  show(slider, trigger) {
    let $ = this.$;
    // $('#main-content').addClass('offset-5');
    TweenLite.to($('#main-content'), .6, { className: '+=offset-5' });
    $(slider).find('.controls span').fadeIn();
    $(slider).find('.controls i').removeClass('principal-arrow-right').addClass('principal-cross');
    TweenLite.to($(slider).find('.trigger'), .6, { right: 0 });
  }
  shown(slider, trigger) {
    let $ = this.$;
    $(slider).find('.trigger').removeClass('bg-primary');
  }
  hide(slider, trigger) {
    let $ = this.$;
    // $('#main-content').removeClass('offset-5');
    TweenLite.to($('#main-content'), .6, { className: '-=offset-5' });
    $(slider).find('.controls span').fadeOut();
    $(slider).find('.controls i').addClass('principal-arrow-right').removeClass('principal-cross');
    TweenLite.to($(slider).find('.trigger'), .6, { right: -170 });
    $(slider).find('.trigger').addClass('bg-primary');
  }
}
