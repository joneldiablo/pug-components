'use strict';

import PropertyDescriptor from '../property-descriptor';

describe('PropertyDescriptor View', function() {

  beforeEach(() => {
    this.propertyDescriptor = new PropertyDescriptor();
  });

  it('Should run a few assertions', () => {
    expect(this.propertyDescriptor);
  });

});
