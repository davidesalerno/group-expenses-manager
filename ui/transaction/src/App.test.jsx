import { render, screen } from '@testing-library/react';
import App from './App';

test('renders transactions list', () => {
  render(<App />);
  const transactionsElement = screen.getByText(/Transaction List/i);
  expect(transactionsElement).toBeInTheDocument();
});
