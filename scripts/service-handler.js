'use strict';

export default class ServiceHandler {
  constructor($, queryElement, settings) {
    settings = $.extend({
      submit: true,
      todo: null,//callback form before submit: string || function
      todoUrl: null,//id of url
      urls: {},
      //url: 'http://principal-login.requestcatcher.com/'
      //status code http
      //https://httpstat.us/429
      //https://httpstat.us/500 etc
    }, settings);
    let sh = this;
    sh.settings = settings;
    let $domElement = sh.$domElement = $(queryElement);
    if (sh.settings.submit) {
      let submitH = (e) => {
        e.preventDefault();
        let data = $(e.target).serializeArray();
        data = data.concat(sh.extraData);
        if (typeof sh.settings.todo === 'function') {
          sh.settings.todo(sh, data);
        } else if (typeof sh.settings.todo === 'string') {
          sh[sh.settings.todo](sh.url(sh.settings.todoUrl), data);
        }
      };
      if ($domElement.find('form').length) {
        $domElement.on('submit', 'form', submitH);
      } else {
        $domElement.on('submit', submitH);
      }
    }
  }
  login(url, data) {
    let sh = this;
    let req = sh.ajax(url, data);
    req.fail((jqXHR, textStatus, errorThrown) => {
      var errorData = jqXHR.responseJSON || {};
      //{"error":"invalid_grant","error_description":"Error"}
      switch (jqXHR.status) {
        case 400:
        case 401:
          sh.errorLogin();
          break;
        case 429:
          //como la etiqueta seleccionada es un script no se puede hacer $().find en el contenido
          let $template = $($('#excessAttempts').html());
          sh.error(jqXHR.status, $template.filter('.title').html(), $template.filter('.message').html());
          break;
        case 500: //se especifica que el error 500 va a dar al default
        default:
          sh.error(jqXHR.status, errorData.error_description || textStatus || 'Error', null);
          break;
      }
    }).done(function (resp) {
      sh.doneLogin(resp);
    });
  }
  signout() {
    let sh = this;
    //url += '/' + sh.$domElement[0].email.value;
    let token = sh.getToken();
    let req = sh.ajax(sh.url('signout'), null, { 'Authorization': token });
    req.always(function () {
      sh.removeToken();
      location.assign(baseUrl + 'logout/');
    });
    return req;
  }
  userSelect(url) {
    let sh = this;
    let token = sh.getToken();
    let req = sh.ajax(url, null, { 'Authorization': token });
    req.then(function (data, status, res) {
      if (data.EsEmail == 'S') {
        sh.doneUserSelect(data);
      } else {
        res.responseJSON = data;
        return $.Deferred().reject(res, 'Error', 'Found');
      }
    }).fail((jqXHR, textStatus, errorThrown) => {
      var errorData = jqXHR.responseJSON || {};
      //{"error":"invalid_grant","error_description":"Error"}
      if (errorData.MailUnico) {
        if (errorData.MailUnico == 'S') {
          sh.errorUserSelectFound();
        } else {
          sh.errorUserselectCallcenter();
        }
      } else {
        sh.error(jqXHR.status, errorData.error_description || textStatus || 'Error', null, jqXHR.responseJSON);
      }
    });
  }
  contracts() {
    let sh = this;
    //url += '/' + sh.$domElement[0].email.value;
    let token = sh.getToken();
    let req = sh.ajax(sh.url('contracts'), null, { 'Authorization': token });
    req.fail((jqXHR, textStatus, errorThrown) => {
      var errorData = jqXHR.responseJSON || {};
      switch (jqXHR.status) {
        case 401:
          sh.errorToken();
          break;
        case 500: //se especifica que el error 500 va a dar al default
        default:
          sh.error(jqXHR.status, errorData.error_description || textStatus || 'Error');
          break;
      }
    });
    return req;
  }
  alias(url, data) {
    let sh = this;
    let token = sh.getToken();
    let req = sh.ajax(sh.url('alias'), data, { 'Authorization': token });
    req.fail((jqXHR, textStatus, errorThrown) => {
      var errorData = jqXHR.responseJSON || {};
      switch (jqXHR.status) {
        case 401:
          sh.errorToken();
          break;
        case 500: //se especifica que el error 500 va a dar al default
        default:
          sh.error(jqXHR.status, errorData.error_description || textStatus || 'Error');
          break;
      }
    });
    return req;
  }
  ajax(url, data, headers) {
    let sh = this;
    let request = $.ajax({
      url: url,
      data: data,
      method: 'POST',
      dataType: 'json',
      crossDomain: true,
      headers: headers,
      beforeSend: () => {
        sh.loading();
      },
      complete: () => {
        sh.loadingStop();
      }
    });
    return request;
  }
  doneLogin(data, textStatus, jqXHR) {
    this.setToken(data);
    this.userSelect(this.url('userSelect'));
  }
  doneUserSelect(data, textStatus, jqXHR) {
    sessionStorage.setItem('user', JSON.stringify(data));
    location.assign(baseUrl + 'dashboard/');
  }
  errorLogin() {
    this.$domElement.find('#error-msg').show();
    let $input = this.$domElement.find('.input-group-icon,:not(.input-group-icon)>.form-control');
    $input.addClass('is-invalid');
  }
  errorUserSelectFound() {
    //TODO: el nombre de usaurio está estático!!!! hay que cambiarlo para mostrar el que venga en los datos
    $('.modal').modal('hide');
    $('#update-account').modal('show');
  }
  errorUserselectCallcenter() {
    let $template = $($('#callCenter').html());
    this.error(300, $template.filter('.title').html(), $template.filter('.message').html());
  }
  errorToken() {
    this.removeToken();
    location.assign(baseUrl + 'login/');
  }
  error(status, title, body, jsonResp) {
    $('.modal').modal('hide');
    $('#errorCatcher').find('.modal-title span').text(title || 'Error');
    $('#errorCatcher').find('.modal-body .message').html(body || '<p>Código de error: ' + status + '</p>');
    if (jsonResp) {
      $('#errorCatcher').find('.modal-body .message').append($('<p></p>').jJsonViewer(jsonResp, { expanded: true }));
    }
    $('#errorCatcher').modal('show');
  }
  setToken(resp) {
    resp.date = Date.now();
    sessionStorage.setItem('token', JSON.stringify(resp));
  }
  getToken() {
    let resp = JSON.parse(sessionStorage.getItem('token'));
    if (resp) {
      return resp.token_type + ' ' + resp.access_token;
    } else {
      return false;
    }
  }
  removeToken() {
    sessionStorage.removeItem('token');
  }
  url(id) {
    if (id == 'base') {
      return this.settings.urls.base;
    } else {
      return this.settings.urls.base + this.settings.urls[id];
    }
  }
  loading(queryElement) {
    $(queryElement || this.$domElement).loading();
  }
  loadingStop(queryElement) {
    $(queryElement || this.$domElement).loading('stop');
  }
  getExtraData() {
    return this.extraData;
  }
  setExtraData(data) {
    this.extraData = data;
  }
}