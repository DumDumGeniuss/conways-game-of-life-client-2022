import { Conways } from './Conways';

describe('ConwaysBoard', () => {
  it('Should inject a canvas to the elment passed in constructor', () => {
    const divElement = document.createElement('div');
    new Conways(divElement, 10);

    expect(divElement.childNodes[0].nodeName).toBe('CANVAS');
  });
});
