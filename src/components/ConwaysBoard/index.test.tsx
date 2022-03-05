import { render } from '@testing-library/react';
import ConwaysBoard from '.';

describe('ConwaysBoard', () => {
  it('Has canvas tag', () => {
    const onCellClick = () => {};
    const { container } = render(
      <ConwaysBoard size={3} onCellClick={onCellClick} />
    );

    const canvas = container.querySelector('canvas');

    expect(canvas).not.toBeUndefined();
  });
});
