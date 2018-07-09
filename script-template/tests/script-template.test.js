'use strict';

import ScriptTemplate from '../script-template';

describe('ScriptTemplate View', function() {

  beforeEach(() => {
    this.scriptTemplate = new ScriptTemplate();
  });

  it('Should run a few assertions', () => {
    expect(this.scriptTemplate).toBeDefined();
  });

});
