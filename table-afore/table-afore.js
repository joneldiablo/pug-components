'use strict';

import Table from '../table/table';

export default class TableAfore extends Table {
  constructor($, queryElement, data) {
    super($, queryElement, data);
    this.name = 'table-afore';
  }
}
