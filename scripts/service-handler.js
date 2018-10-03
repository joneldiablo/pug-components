'use strict';

export default class ServiceHandler {
  constructor($, queryElement, settings) {
    settings = $.extend({
      submit: true,
      todo: null, //callback form before submit: string || function
      todoUrl: null, //id of url
      urls: {}
    }, settings);
    this.$ = $;
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
    let $ = this.$;
    if (e.preventDefault && e.stopPropagation) {
      e.preventDefault();
      e.stopPropagation();
      data = $(e.target).serializeObject();
    } else {
      data = e.data;
    }
    data = sh.extend({}, data, sh.extraData);
    if (typeof sh.settings.todo === 'function') {
      sh.settings.todo(sh, data);
    } else if (typeof sh.settings.todo === 'string') {
      sh[sh.settings.todo](sh.url(sh.settings.todoUrl), data);
    }
  }
  ajax(url, data, headers, extraConf) {
    let sh = this;
    let $ = this.$;
    let conf = $.extend({
      url: url,
      headers: headers,
      data: data,
      method: 'POST',
      dataType: 'json',
      crossDomain: true,
      cache: false,
      beforeSend: () => {
        sh.loading();
      },
      complete: () => {
        sh.loadingStop();
      }
    }, extraConf);
    let request = $.ajax(conf);
    return request;
  }
  modal(status, title, body, jsonResp) {
    let $ = this.$;
    $('.modal').modal('hide');
    let $modal = $('#modalGeneral');
    $modal.find('.modal-title span').text(title || 'Error');
    $modal.find('.modal-body .message').html(body || '<p>Código de error: ' + status + '</p>');
    if (jsonResp) {
      let e = typeof jsonResp == 'string' ? jsonResp : $('<p></p>').jJsonViewer(jsonResp, {
        expanded: true
      });
      $modal.find('.modal-body .message').append(e);
    }
    setTimeout(() => {
      $modal.modal('show');
    }, 600);
  }
  modalTemplate(queryElement, status) {
    let $ = this.$;
    let sh = this;
    let $template = $($(queryElement).html());
    let $title = $template.filter('.title');
    let $message = $template.filter('.message');
    sh.modal(status, $title.html(), $message.html());
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
    let $ = this.$;
    let $element;
    if (queryElement) {
      $element = $(queryElement);
    } else {
      $element = this.$domElement;
    }
    $element.addClass("loading-form");
    //this.$(queryElement || this.$domElement).loading();
  }
  loadingStop(queryElement) {
    let $ = this.$;
    let $element;
    if (queryElement) {
      $element = $(queryElement);
    } else {
      $element = this.$domElement;
    }
    $element.removeClass("loading-form");
    //this.$(queryElement || this.$domElement).loading('stop');
  }
  getExtraData() {
    return this.extraData;
  }
  setExtraData(data) {
    this.extraData = data;
  }
  appendExtraData(data) {
    this.extend(this.extraData, data);
  }
  serializeObject(serialize) {
    var o = {};
    for (const i in serialize) {
      if (serialize.hasOwnProperty(i)) {
        const element = serialize[i];
        if (o[element.name]) {
          if (!o[element.name].push) {
            o[element.name] = [o[element.name]];
          }
          o[element.name].push(element.value || '');
        } else {
          o[element.name] = element.value || '';
        }
      }
    }
    return o;
  }
  extend(target) {
    var sources = [].slice.call(arguments, 1);
    for (const id in sources) {
      if (sources.hasOwnProperty(id)) {
        const source = sources[id];
        for (var prop in source) {
          target[prop] = source[prop];
        }
      }
    }
    return target;
  }
}
