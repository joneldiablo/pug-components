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
      messages: {},
      //url: 'http://principal-login.requestcatcher.com/'
      //status code http
      //https://httpstat.us/429
      //https://httpstat.us/500 etc
    }, settings);
    super($, queryElement, settings);
    let vf = this;
    vf.settings = settings;
    vf.$domElement = $(queryElement);
    vf.validation();
  }
  validation() {
    let fv = this;
    let $domElement = fv.$domElement.find('form').length ? fv.$domElement.find('form') : fv.$domElement;
    fv.valid = $domElement.validate({
      normalizer: true,
      errorElement: 'p',
      errorClass: 'is-invalid',
      validClass: 'is-valid active',
      rules: fv.settings.rules,
      messages: fv.settings.messages,
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
    });
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
  userUpdate(url, data) {
    let fv = this;
    //url += '/' + fv.$domElement[0].email.value;
    let token = fv.getToken();
    let req = fv.ajax(url, data, { 'Authorization': token });
    req.fail((jqXHR, textStatus, errorThrown) => {
      var errorData = jqXHR.responseJSON || {};
      //{"error":"invalid_grant","error_description":"Error"}
      switch (jqXHR.status) {
        case 200:
          fv.doneUserSelect();
          break;
        case 304:
          fv.errorUserUpdate();
          break;
        case 404:
          fv.errorUserEmail();
          break;
        case 500: //se especifica que el error 500 va a dar al default
        default:
          fv.error(jqXHR.status, errorData.error_description || textStatus || 'Error', null, jqXHR);
          break;
      }
    }).done(function (resp, textStatus, jqXHR) {
      if (jqXHR.status == 304) {
        fv.errorUserEmail();
      } else {
        fv.doneUserSelect();
      }
    });
  }
  errorUserUpdate() {
    let vf = this;
    vf.valid.showErrors({
      email: vf.settings.messages.errorUserUpdate
    });
  }
  errorUserEmail() {
    let vf = this;
    vf.valid.showErrors({
      email: vf.settings.messages.errorUserEmail
    });
  }
}
