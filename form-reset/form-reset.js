'use strict';

import FormField from '../form-field/form-field';
import FormValidation from '../scripts/form-validation';

export default class FormReset extends FormValidation {
  constructor($, queryElement, settings) {
    let $element = $(queryElement);
    let inputName = $element.find('input:not([type="submit"])').attr('name');
    let rules = {};
    let messages = {};
    rules[inputName] = 'required';
    messages[inputName] = 'Este campo es indispensable';
    settings = $.extend({
      urls: {},
      rules: rules,
      messages: messages
    }, settings);
    super($, queryElement, settings);
    let that = this;
    this.name = 'form-reset';
    this.settings = settings;
    this.$element = $element;
    this.formField = new FormField($, queryElement + ' .form-field', settings);
    $element.css('background', 'transparent');
    $element.on('focus', 'input:not([type=submit])', (e) => {
      that.submitShow();
    });
    $element.on('focusout', 'input:not([type=submit])', (e) => {
      if (!e.target.value) {
        that.submitHide();
      }
    });
  }
  submitToggle() {
    this.$element.find('input[type="submit"]').toggle();
  }
  submitHide() {
    this.$element.find('input[type="submit"]').hide();
  }
  submitShow() {
    this.$element.find('input[type="submit"]').show();
  }
}
