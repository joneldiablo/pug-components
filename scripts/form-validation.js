'use strict';
//valida formularios y sincroniza con el servidor
//TODO: separa en dos clases una que valide y otra que sincronice,
//      además que sean abstractas y heredar de estas únicamente

import ServiceHandler from './service-handler';

export default class FormValidation extends ServiceHandler {
  constructor($, queryElement, settings) {
    settings = $.extend({
      urls: {},
      rules: {},
      messages: {}
    }, settings);
    super($, queryElement, settings);
    this.$ = $;
    let vf = this;
    vf.settings = settings;
    vf.$domElement = $(queryElement);
    vf.validation(settings);
  }
  validation(settings) {
    let $ = this.$;
    let fv = this;
    let $domElement = fv.$domElement.find('form').length ? fv.$domElement.find('form') : fv.$domElement;
    fv.valid = $domElement.validate($.extend({
      normalizer: true,
      errorElement: 'p',
      errorClass: 'is-invalid',
      validClass: 'is-valid active',
      errorPlacement: (error, element) => {
        element.closest('.form-group').append(error.addClass('text-danger pl-3'));
      },
      highlight: (element, errorClass, validClass) => {
        let igi = $(element).closest('.input-group-icon');
        (igi.length > 0 ? igi : $(element)).addClass(errorClass).removeClass(validClass);
      },
      unhighlight: (element, errorClass, validClass) => {
        let igi = $(element).closest('.input-group-icon');
        (igi.length > 0 ? igi : $(element)).removeClass(errorClass).addClass(validClass);
      }
    }, settings));
    $domElement.on('change', 'input, select, textarea', (e) => {
      $domElement.find('[type=submit]').prop('disabled', !$domElement.valid());
    });
    $domElement.on('keyup', 'input, textarea', (e) => {
      clearTimeout(fv.st);
      fv.st = setTimeout(() => {
        $domElement.find('[type=submit]').prop('disabled', !$domElement.valid());
      }, 300);
    });
  }
}
