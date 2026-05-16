// Card renderiza la información principal y valida interacciones de ver detalle y favoritos.

import '../../i18n';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from './Card';

describe('Card component', () => {
  it('renders title and category in list variant', () => {
    render(
      <Card
        title="Catan"
        category="Strategy"
        image="/catan.png"
      />,
    );

    const title = screen.getByText('Catan');
    const category = screen.getByText('Strategy');
    const image = screen.getByRole('img', { name: 'Catan' });

    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it('calls onViewDetails when the card is clicked', async () => {
    const user = userEvent.setup();
    const onViewDetails = vi.fn();

    render(
      <Card
        title="Carcassonne"
        category="Tile placement"
        onViewDetails={onViewDetails}
      />,
    );

    await user.click(screen.getByRole('button'));

    expect(onViewDetails).toHaveBeenCalledTimes(1);
  });

  it('calls onToggleFavorite when favorite icon is clicked', async () => {
    const user = userEvent.setup();
    const onToggleFavorite = vi.fn();

    render(
      <Card
        title="Azul"
        category="Abstract"
        onToggleFavorite={onToggleFavorite}
        isFavorite={false}
      />,
    );

    const favoriteButton = screen.getByRole('button', { name: 'Agregar a favoritos' });
    await user.click(favoriteButton);

    expect(onToggleFavorite).toHaveBeenCalledTimes(1);
  });
});
