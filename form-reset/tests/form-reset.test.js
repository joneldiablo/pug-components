'use strict';

import FormReset from '../form-reset';

describe('FormReset View', function() {

  beforeEach(() => {
    this.formReset = new FormReset();
  });

  it('Should run a few assertions', () => {
    expect(this.formReset).toBeDefined();
  });

});
