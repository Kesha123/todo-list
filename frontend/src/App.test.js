import { render, screen } from '@testing-library/react';
import App from './App';

test('Default tasks number', () => {
    render(<App/>);
    const defaultString = "Total: 0 Left: 0";
    expect(screen.getByText(defaultString)).toBeInTheDocument();
})
