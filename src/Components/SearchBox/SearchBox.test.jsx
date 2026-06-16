//SearchBox muestra un input con placeholder y un icono de búsqueda.
//Al escribir, el valor del input se actualiza y se llama a onSearchChange con el nuevo valor.
//Si el input no está vacío, se muestra un botón para limpiar la búsqueda que borra el input y llama a onSearchChange con una cadena vacía.

import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBox from "./SearchBox";

describe("SearchBox component", () => {
    it("renders the input with the correct placeholder and aria-label", () => {
        render(<SearchBox onSearchChange={() => {}} />);
        const input = screen.getByPlaceholderText(/¿Qué querés jugar hoy?/i);
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('aria-label', 'Buscar juegos');
    });

    it("calls onSearchChange with the correct value when the input changes", async () => {
        const user = userEvent.setup();
        const mockOnSearchChange = vi.fn();
        render(<SearchBox onSearchChange={mockOnSearchChange} />);
        const input = screen.getByPlaceholderText(/¿Qué querés jugar hoy?/i);
        await user.type(input, "test");
        expect(mockOnSearchChange).toHaveBeenCalledWith("test");
    });

    it("shows the clear button when the input is not empty and calls onSearchChange with an empty string when clicked", async () => {
        const user = userEvent.setup();
        const mockOnSearchChange = vi.fn();
        render(<SearchBox onSearchChange={mockOnSearchChange} />);
        const input = screen.getByPlaceholderText(/¿Qué querés jugar hoy?/i);
        await user.type(input, "test");
        const clearButton = screen.getByRole("button", { name: /limpiar búsqueda/i });
        expect(clearButton).toBeInTheDocument();
        await user.click(clearButton);
        expect(mockOnSearchChange).toHaveBeenCalledWith("");
    });

    it("does not show the clear button when the input is empty", () => {
        render(<SearchBox onSearchChange={() => {}} />);
        const clearButton = screen.queryByRole("button", { name: /limpiar búsqueda/i });
        expect(clearButton).not.toBeInTheDocument();
    });

    it("calls onSearchChange with the correct value when the form is submitted", async () => {
        const user = userEvent.setup();
        const mockOnSearchChange = vi.fn();
        render(<SearchBox onSearchChange={mockOnSearchChange} />);
        const input = screen.getByPlaceholderText(/¿Qué querés jugar hoy?/i);
        await user.type(input, "test");
        await user.keyboard("{Enter}");
        expect(mockOnSearchChange).toHaveBeenCalledWith("test");
    });


});