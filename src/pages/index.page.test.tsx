import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import Home from '@/pages/index.page';
import { makeStore } from '@/stores';

describe('Home', () => {
  it('Has greetings', () => {
    render(
      <Provider store={makeStore()}>
        <Home socketUrl="ws://example.com" />
      </Provider>
    );

    const greetingsDom = screen.getByText('index.conways.game');

    expect(greetingsDom).toBeInTheDocument();
  });
});
