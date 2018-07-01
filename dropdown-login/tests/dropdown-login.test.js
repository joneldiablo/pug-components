'use strict';

import DropdownLogin from '../dropdown-login';

describe('DropdownLogin View', function() {

  beforeEach(() => {
    this.dropdownLogin = new DropdownLogin();
  });

  it('Should run a few assertions', () => {
    expect(this.dropdownLogin).toBeDefined();
  });

});
