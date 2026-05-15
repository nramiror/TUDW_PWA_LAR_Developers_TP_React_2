//title muestra un texto que llega por props, el nivel del título se determina por la prop level, 
// y se le pueden agregar clases adicionales con className

import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Title from "./Title";

describe("Title component", () => {
    it("renders the correct heading level based on the level prop", () => {
        render(<Title level={2} children="Test Heading" />);
        const heading = screen.getByText("Test Heading");
        expect(heading.tagName).toBe("H2");
    });

    it("render correctly text", () => {
        render(<Title level={3} children="Test Heading" />);
        const heading = screen.getByText("Test Heading");
        expect(heading).toBeInTheDocument();
    });

    it("error renders the incorrect heading level based on the level prop", () => {
        render(<Title level={8} children="Test Heading" />);
        const heading = screen.getByText("Test Heading");
        expect(heading.tagName).toBe("H1");
    });

        it("error renders the incorrect heading level based on the level prop", () => {
        render(<Title level={-2} children="Test Heading" />);
        const heading = screen.getByText("Test Heading");
        expect(heading.tagName).toBe("H1");
    });

        it("renders the correct heading with className prop", () => {
        render(<Title level={8} children="Test Heading" className="customClass" />);
        const customClass = "font-comfortaa font-bold text-title tracking-tight color-primary";
        const heading = screen.getByText("Test Heading");
        expect(heading).toHaveClass("customClass");
    });
});  