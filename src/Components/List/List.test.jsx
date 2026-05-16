//List se encarga de mostrar una lista de cards.
//Si no hay items, muestra un alert.
//Recibe por props: items, onViewDetails, onToggleFavorite, emptyMessage y className.

import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import i18next from 'i18next';
import List from "./List";


describe("List component", () => {
    const items = [
        { id: 1, name: "Item 1", image: "image1.jpg", category: "Category 1", isFavorite: false },
        { id: 2, name: "Item 2", image: "image2.jpg", category: "Category 2", isFavorite: true },
    ];

    beforeEach(() => {
        localStorage.clear();
    });

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
        
        const allButtons = screen.getAllByRole('button');
        const favoriteButton = allButtons.find(btn => btn.getAttribute('aria-pressed') === 'false');
        await user.click(favoriteButton);
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
        const emptyMessageText = i18next.t('list.empty');
        const alert = screen.getByText(emptyMessageText);
        expect(alert).toBeInTheDocument();
    });
});