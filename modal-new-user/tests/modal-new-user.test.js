'use strict';

import ModalNewUser from '../modal-new-user';

describe('ModalNewUser View', function() {

  beforeEach(() => {
    this.modalNewUser = new ModalNewUser();
  });

  it('Should run a few assertions', () => {
    expect(this.modalNewUser).toBeDefined();
  });

});
