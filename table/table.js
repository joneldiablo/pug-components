'use strict';

import ServiceHandler from '../scripts/service-handler';

export default class Table {
  constructor($, queryElement, settings) {
    this.settings = $.extend({
      submit: true,
      actionClick: (table) => {

      },
      data: {}
    }, settings);
    this.name = 'table';
    this.$ = $;
    let table = this;
    table.queryElement = queryElement;
    table.$element = $(queryElement);
    table.data = settings.data;
    if (Array.isArray(table.data)) {
      table.fillTable();
    }
  }
  fillTable(data) {
    let $ = this.$;
    let table = this;
    table.data = data || table.data;
    let $template = $(table.$element.find('script[type="text/template"]').html());
    table.$element.find('tbody').empty();
    if (table.data.length) {
      table.data.forEach((row, i) => {
        let $r = $template.clone();
        for (const col in row) {
          if (row.hasOwnProperty(col)) {
            const content = row[col];
            let $cell = $r.find('td.' + col);
            $cell.data('column', col);
            $cell.data('row', i);
            if (!$cell.is('.editable')) {
              $cell.find('span.data').text(content);
            } else {
              $cell.find('input').val(content);
            }
            //TODO: deshardcodear esta parte!!!!!!
            if (col == 'agreement' || col == 'nss') {
              $cell.on('click', function (e) {
                table.action(i, col);
              });
            }
          }
          table.$element.find('tbody').append($r);
        }
      });
    } else {
      table.$element.hide();
    }
    table.$element.on('click', '.form-field, button[type=button]', function (e) {
      let $td = $(e.target).closest('td');
      table.$focus = $td;
      table.edit($td);
    });
   /*  table.$element.on('blur', 'td', function (e) {
      let $td = table.$focus;
      table.editClose($td);
      table.editCancel($td);
    }); */
    table.$element.on('keyup', 'input', function (e) {
      let $td = $(e.target).closest('td');
      if (e.keyCode == 27) {
        table.editClose($td);
        table.editCancel($td);
      }
    });
  }
  getData() {
    let $ = this.$;

  }
  setData(url, data) {
    let $ = this.$;

  }
  getDataByRow(id) {
    let table = this;
    let dataOutput = {};
    for (const key in table.data[id]) {
      let name = key;
      if (table.settings.aliases[key]) {
        name = table.settings.aliases[key];
      }
      dataOutput[name] = table.data[id][key];
    }
    return dataOutput;
  }
  edit($cell) {
    let $ = this.$;
    let $input = $cell.find('input');
    if ($input.prop('disabled')) {
      $input.prop('disabled', false).focus().removeClass('border-0');
      let $buttons = $cell.find('button');
      $buttons.toggle();
    }
  }
  editClose($cell) {
    let $ = this.$;
    let $input = $cell.find('input');
    if (!$input.prop('disabled')) {
      $input.prop('disabled', true).addClass('border-0');
      let $buttons = $cell.find('button');
      $buttons.toggle();
    }
  }
  editSaveCell($cell) {
    this.data[$cell.data('row')][$cell.data('column')] = $cell.find('input').val();
  }
  editCancel($cell) {
    $cell.find('input').val(this.data[$cell.data('row')][$cell.data('column')]);
  }
  action(i, col) {
    this.settings.actionClick(this, i, col);
  }
}
