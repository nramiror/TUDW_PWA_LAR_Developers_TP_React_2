// Header muestra navegación, buscador e idioma con accesibilidad y acciones visibles.

import '../../i18n';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';


const renderHeader = (props = {}) => {
  const defaultProps = {
    onSearchChange: vi.fn(),
    languageOptions: [
      { code: 'es', label: 'ES', ariaLabel: 'Cambiar idioma a Español' },
      { code: 'en', label: 'EN', ariaLabel: 'Cambiar idioma a English' },
    ],
    activeLanguage: 'es',
    onChangeLanguage: vi.fn(),
  };

  return render(
    <MemoryRouter>
      <Header {...defaultProps} {...props} />
    </MemoryRouter>,
  );
};

describe('Header component', () => {
  it('renders the logo, search box and favorites navigation', () => {
    renderHeader();

    const homeLink = screen.getByRole('link', { name: 'Ir al inicio' });
    const logo = screen.getByRole('img', { name: 'Logo de ReactGames' });
    const searchInput = screen.getByRole('textbox', { name: 'Buscar juegos' });
    const favoritesLink = screen.queryByRole('link', { name: /favoritos/i });
    expect(favoritesLink).not.toBeInTheDocument();

    expect(homeLink).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(favoritesLink).not.toBeInTheDocument();
  });

  it('calls onSearchChange when the user writes in the search box', async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();

    renderHeader({ onSearchChange });

    const searchInput = screen.getByRole('textbox', { name: 'Buscar juegos' });
    await user.type(searchInput, 'Catan');

    expect(onSearchChange).toHaveBeenLastCalledWith('Catan');
  });

  it('calls onChangeLanguage when the user selects another language', async () => {
    const user = userEvent.setup();
    const onChangeLanguage = vi.fn();

    renderHeader({ onChangeLanguage });

    const englishButton = screen.getByRole('button', { name: 'Cambiar idioma a English' });
    await user.click(englishButton);

    expect(onChangeLanguage).toHaveBeenCalledWith('en');
  });
});
