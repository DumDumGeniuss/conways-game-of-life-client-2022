import { ConwaysGameCanvas } from '.';

describe('ConwaysBoard', () => {
  it('Should inject a canvas to the elment passed in constructor', () => {
    const divElement = document.createElement('div');
    const onCellClick = () => {};
    new ConwaysGameCanvas(
      divElement,
      1,
      [[{ live: false, color: '#000000' }]],
      { id: '1', color: '#000000' },
      onCellClick
    );

    expect(divElement.childNodes[0].nodeName).toBe('CANVAS');
  });
});
