'use strict';

import ModalGeneral from '../modal-general';

describe('ModalGeneral View', function() {

  beforeEach(() => {
    this.modalGeneral = new ModalGeneral();
  });

  it('Should run a few assertions', () => {
    expect(this.modalGeneral).toBeDefined();
  });

});
