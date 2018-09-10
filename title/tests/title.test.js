'use strict';

import Title from '../title';

describe('Title View', function() {

  beforeEach(() => {
    this.title = new Title();
  });

  it('Should run a few assertions', () => {
    expect(this.title);
  });

});
