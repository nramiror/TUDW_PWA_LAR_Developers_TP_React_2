//List se encarga de mostrar una lista de cards.
//Si no hay items, muestra un alert.
//Recibe por props: items, onViewDetails, onToggleFavorite, emptyMessage y className.

import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import List from "./List";
import '../../i18n';


describe("List component", () => {
    const items = [
        { id: 1, name: "Item 1", image: "image1.jpg", category: "Category 1", isFavorite: false },
        { id: 2, name: "Item 2", image: "image2.jpg", category: "Category 2", isFavorite: true },
    ];
    it("renders the correct number of items based on the items prop", () => {
        render(
            <MemoryRouter>
                <List items={items} />
            </MemoryRouter>
        );
        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(2);
    });

    it("calls onViewDetails with the correct item when a card is clicked", async () => {
        const user = userEvent.setup();
        const mockOnViewDetails = vi.fn();
        render(
            <MemoryRouter>
                <List items={items} onViewDetails={mockOnViewDetails} />
            </MemoryRouter>
        );
        const cardButtons = screen.getAllByRole('button', { name: /Item \d/ });
        await user.click(cardButtons[0]);
        expect(mockOnViewDetails).toHaveBeenCalledWith(items[0]);
    });

    it("calls onToggleFavorite with the correct item id when the favorite button is clicked", async () => {
        const user = userEvent.setup();
        const mockOnToggleFavorite = vi.fn();
        render(
            <MemoryRouter>
                <List items={items} onToggleFavorite={mockOnToggleFavorite} />
            </MemoryRouter>
        );
        const favoriteButtons = screen.getAllByRole('button', { name: /Agregar a favoritos|Quitar de favoritos/i });
        await user.click(favoriteButtons[0]);
        expect(mockOnToggleFavorite).toHaveBeenCalledWith(items[0].id);
    });

    it("renders the empty message when there are no items", () => {
        const emptyMessage = "No items available";
        render(
            <MemoryRouter>
                <List items={[]} emptyMessage={emptyMessage} />
            </MemoryRouter>
        );
        const alert = screen.getByText(emptyMessage);
        expect(alert).toBeInTheDocument();
    });

    it("renders the empty message from translation when there are no items and emptyMessage prop is not provided", () => {
        render(
            <MemoryRouter>
                <List items={[]} />
            </MemoryRouter>
        );
        const alert = screen.getByText(/No hay juegos para mostrar/i);
        expect(alert).toBeInTheDocument();
    });


});