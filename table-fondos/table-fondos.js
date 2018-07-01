'use strict';

import Table from '../table/table';

export default class TableFondos extends Table {
  constructor($, queryElement, data) {
    super($, queryElement, data);
    this.name = 'table-fondos';
  }
}
