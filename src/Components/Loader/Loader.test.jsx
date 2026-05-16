// Loader muestra un spinner y un mensaje opcional, y soporta modo fullScreen.

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader component', () => {
  it('renders status role and message', () => {
    render(<Loader message="Cargando..." />);

    const status = screen.getByRole('status');
    const message = screen.getByText('Cargando...', { selector: 'p' });

    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(message).toBeInTheDocument();
  });

  it('applies fullScreen class when fullScreen is true', () => {
    render(<Loader message="Esperá" fullScreen />);

    const status = screen.getByRole('status');

    expect(status).toHaveClass('min-h-screen');
  });

  it('renders spinner element with aria-hidden', () => {
    render(<Loader message="Cargando..." />);

    const status = screen.getByRole('status');
    const spinner = status.querySelector('span[aria-hidden="true"]');

    expect(spinner).toBeInTheDocument();
  });
});
