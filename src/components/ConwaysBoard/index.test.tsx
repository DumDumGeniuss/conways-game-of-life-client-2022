import { render } from '@testing-library/react';
import ConwaysBoard from '.';

describe('ConwaysBoard', () => {
  it('Has canvas tag', () => {
    const onReviveCell = () => {};
    const onKillCell = () => {};
    const { container } = render(
      <ConwaysBoard onReviveCell={onReviveCell} onKillCell={onKillCell} />
    );

    const canvas = container.querySelector('canvas');

    expect(canvas).not.toBeUndefined();
  });
});
