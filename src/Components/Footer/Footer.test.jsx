// Footer muestra información de la app y enlaces a redes sociales con etiquetas accesibles.

import '../../i18n';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  it('renders the copyright and address text', () => {
    render(<Footer />);

    const copyrightText = 'Copyright © 2026 ReactGames LAR Developers';
    const addressText = 'Av. Siempre Viva 742';

    expect(screen.getByText(copyrightText)).toBeInTheDocument();
    expect(screen.getByText(addressText)).toBeInTheDocument();
  });

  it('renders the social navigation with an accessible label', () => {
    render(<Footer />);

    expect(screen.getByRole('navigation', { name: 'Redes sociales' })).toBeInTheDocument();
  });

  it('renders the social links with their correct accessible names and URLs', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'Facebook' })).toHaveAttribute('href', 'https://www.facebook.com');
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', 'https://www.instagram.com');
    expect(screen.getByRole('link', { name: 'X' })).toHaveAttribute('href', 'https://x.com');
  });
});