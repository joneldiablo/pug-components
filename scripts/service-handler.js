'use strict';

export default class ServiceHandler {
  constructor($, queryElement, settings) {
    settings = $.extend({
      submit: true,
      todo: null,//callback form before submit: string || function
      todoUrl: null,//id of url
      urls: {}
    }, settings);
    let sh = this;
    sh.settings = settings;
    let $domElement = sh.$domElement = $(queryElement);
    if (sh.settings.submit) {
      if ($domElement.find('form').length) {
        $domElement.on('submit', 'form', function (e) {
          sh.submit(e);
        });
      } else {
        $domElement.on('submit', function (e) {
          sh.submit(e);
        });
      }
    }
  }
  submit(e) {
    let data;
    let sh = this;
    if (e.preventDefault && e.stopPropagation) {
      e.preventDefault();
      e.stopPropagation();
      data = $(e.target).serializeArray();
    } else {
      data = e.data;
    }
    data = data.concat(sh.extraData);
    if (typeof sh.settings.todo === 'function') {
      sh.settings.todo(sh, data);
    } else if (typeof sh.settings.todo === 'string') {
      sh[sh.settings.todo](sh.url(sh.settings.todoUrl), data);
    }
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
  modal(status, title, body, jsonResp) {
    $('.modal').modal('hide');
    $('#errorCatcher').find('.modal-title span').text(title || 'Error');
    $('#errorCatcher').find('.modal-body .message').html(body || '<p>Código de error: ' + status + '</p>');
    if (jsonResp) {
      $('#errorCatcher').find('.modal-body .message').append($('<p></p>').jJsonViewer(jsonResp, { expanded: true }));
    }
    setTimeout(() => {
      $('#errorCatcher').modal('show');
    }, 600);
  }
  modalTemplate(queryElement, status) {
    let sh = this;
    let $template = $($(queryElement).html());
    sh.modal(status, $template.filter('.title').html(), $template.filter('.message').html());
  }
  errorProcess(status, textStatus, errorData) {
    let sh = this;
    let title = 'Error';
    if (typeof errorData === 'string') {
      title = errorData;
      errorData = false;
    } else {
      title = textStatus;
    }
    sh.modal(status, title, null, errorData);
  }
  url(id) {
    if (typeof this.settings.urls[id] !== 'undefined') {
      if (id == 'base') {
        return this.settings.urls.base;
      } else {
        if (this.settings.urls[id].search(/^https?:\/\//) > -1) {
          return this.settings.urls[id];
        } else {
          return this.settings.urls.base + this.settings.urls[id];
        }
      }
    } else {
      console.log('error todoUrl "' + id + '" is not defined');
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