'use strict';

const InputGroupIcon = require('../input-group-icon/input-group-icon');

export default class FormField {
  constructor($, domElement, settings) {
    this.name = 'form-field';
    this.inputGroupIcon = new InputGroupIcon($, $(domElement).find('.input-group-icon'), settings);
  }
  setInvalidIGI() {
    this.inputGroupIcon.setInvalid();
  }
  resetIGI() {
    this.inputGroupIcon.reset();
  }
}