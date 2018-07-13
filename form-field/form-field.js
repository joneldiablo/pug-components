'use strict';

import InputGroupIcon from '../input-group-icon/input-group-icon';

export default class FormField extends InputGroupIcon{
  constructor($, domElement, settings) {
    super($, domElement + '>.input-group-icon', settings);
    this.name = 'form-field';
  }
}