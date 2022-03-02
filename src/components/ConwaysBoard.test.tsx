import { render } from '@testing-library/react';
import ConwaysBoard from './ConwaysBoard';

describe('ConwaysBoard', () => {
  it('Has canvas tag', () => {
    const { container } = render(<ConwaysBoard size={800} />);

    const canvas = container.querySelector('canvas');

    expect(canvas).not.toBeUndefined();
  });
});
