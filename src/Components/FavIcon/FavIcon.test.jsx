//FavIcon muestra el boton de favoritos.
//Segun su variante puede ser un boton de navegacion o un boton de accion para agregar o eliminar favoritos.

import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import FavIcon from "./FavIcon";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("FavIcon component", () => {
    it("renders a button when no \"to\" prop is provided", () => {
        render(<FavIcon />);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it("renders a link when \"to\" prop is provided", () => {
        render(
            <MemoryRouter>
                <FavIcon to="/favorites" />
            </MemoryRouter>
        );
        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/favorites');
    });

    it("applies correct styles for nav variant", () => {
        render(
            <MemoryRouter>
                <FavIcon to="/favorites" variant="nav" />
            </MemoryRouter>
        );
        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/favorites');
    });

    it("applies correct styles for card variant when isFavorite is true", () => {
        render(<FavIcon variant="card" isFavorite={true} />);
        const icon = screen.getByText('star');
        expect(icon).toHaveStyle("font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"); 
});

    it("applies correct styles for card variant when isFavorite is false", () => {
        render(<FavIcon variant="card" isFavorite={false} />);
        const icon = screen.getByText('star');
        expect(icon).toHaveStyle("font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24");
    });

    it("calls onClick handler when button is clicked", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();
        render(<FavIcon onClick={handleClick} />);
        const button = screen.getByRole('button');
        await user.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

});