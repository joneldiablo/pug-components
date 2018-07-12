'use strict';

export default class Copy {
  constructor($) {
    this.name = 'copy';
    let url = 'http://principal-login.multiplicamx.com/backend/google-ss.php';

    $.ajax({
      url: url,
      method: 'get',
    }).done((data) => {
      //telefono
      let tel = data['id-tel'].es;
      let telText = data['id-tel-text'].es;
      //cargar copy
      $.each(data, (i, copy) => {
        let $domEl = $('*[copy-text=' + copy.id + ']');
        if (copy.es.indexOf('**tel**') > -1) {
          copy.es = copy.es.replace('**tel**', '<a href="tel:' + tel + '" style="color:inherit"><u>' + telText + '</u></a>');
        }
        //colocar copy en data-content en lugar de colocarlo como contenido de la etiqueta
        //podría cambiar por un switch y agregar más opciones
        if ($domEl.is('[data-content]')) {
          $domEl.attr('data-content', copy.es);
        } else {
          $domEl.html(copy.es);
        }
      });
    }).fail((jqXHR, textStatus, errorThrown) => {
      console.log(jqXHR, textStatus, errorThrown);
    });
  }
}
