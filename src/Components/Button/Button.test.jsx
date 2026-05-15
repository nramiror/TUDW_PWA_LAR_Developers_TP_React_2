//Button muestra el texto que se le pasa por props, o "Botón" si no se le pasa nada.
//Tiene variantes de estilo y tamaños.
//También puede mostrar íconos a la izquierda o derecha del texto. 
// El botón acepta clases adicionales para personalización.

import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
    it("renders the correct text based on the text prop", () => {
        render(<Button text="Click Me" />);
        const button = screen.getByRole("button", { name: "Click Me" });
        expect(button).toBeInTheDocument();
    });

    it("renders the default text when no text prop is provided", () => {
        render(<Button />);
        const button = screen.getByRole("button", { name: "Botón" });
        expect(button).toBeInTheDocument();
    }); 

    it("renders with the correct variant and size classes", () => {
        render(<Button variant="secondary" size="lg" text="Test Button" />);
        const button = screen.getByRole("button", { name: "Test Button" });
        expect(button).toHaveClass("bg-secondary text-white hover:bg-opacity-90 shadow-sm");
        expect(button).toHaveClass("px-10 py-3 text-lg");
    });

    it("renders with left and right icons", () => {
        render(
        <Button 
            text="Icon Button" 
            leftIcon={<span data-testid="left-icon">L</span>} 
            rightIcon={<span data-testid="right-icon">R</span>} 
        /> );
        const leftIcon = screen.getByTestId("left-icon");
        const rightIcon = screen.getByTestId("right-icon");
        expect(leftIcon).toBeInTheDocument();
        expect(rightIcon).toBeInTheDocument();
    });

    it("renders with additional class names", () => {
        render(<Button text="Styled Button" className="custom-class" />);
        const button = screen.getByRole("button", { name: "Styled Button" });
        expect(button).toHaveClass("custom-class");
    });
});
