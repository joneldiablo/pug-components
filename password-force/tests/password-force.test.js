'use strict';

import PasswordForce from '../password-force';

describe('PasswordForce View', function() {

  beforeEach(() => {
    this.passwordForce = new PasswordForce();
  });

  it('Should run a few assertions', () => {
    expect(this.passwordForce).toBeDefined();
  });

});
