'use strict';

class InputGroupIcon {
  constructor($, domElement, settings) {
    this.name = 'input-group-icon';
    this.domElement = domElement;
    let $inputGroupIcon = this.$inputGroupIcon = $(domElement);
    $inputGroupIcon.on('focus', 'input', function name(e) {
      $(this).closest('.input-group').addClass('active');
    });
    $inputGroupIcon.on('focusout', 'input', function name(e) {
      $(this).closest('.input-group').removeClass('active');
    });
  }
  setInvalid() {
    this.$inputGroupIcon.addClass('is-invalid');
  }
  setValid() {
    this.$inputGroupIcon.addClass('is-valid');
  }
  reset() {
    this.$inputGroupIcon.removeClass('is-invalid is-valid');
  }
}

module.exports = InputGroupIcon;
