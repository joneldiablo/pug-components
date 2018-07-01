'use strict';

import PanelDemo from '../panel-demo';

describe('PanelDemo View', function() {

  beforeEach(() => {
    this.panelDemo = new PanelDemo();
  });

  it('Should run a few assertions', () => {
    expect(this.panelDemo).toBeDefined();
  });

});
