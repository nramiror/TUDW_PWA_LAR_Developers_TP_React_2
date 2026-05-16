//LanguageToggle es un componente que permite cambiar el idioma de la aplicación.
//LanguageToggle es un button group que se comporta como un toggle, es decir, solo puede haber un idioma activo a la vez.
//El estilo permite visualizar cual es el idioma activo.

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import LanguageToggle from "./LanguageToggle";
import userEvent from "@testing-library/user-event";

describe("LanguageToggle component", () => {
    const options = [
        { code: "en", label: "EN", ariaLabel: "English" },
        { code: "es", label: "ES", ariaLabel: "Spanish" },
    ];
    it("renders the correct number of language options", () => {
        render(
            <LanguageToggle
                options={options}
                activeLanguage="en"
                onChangeLanguage={() => { }}
            />
        );
        const languageButtons = screen.getAllByRole('button');
        expect(languageButtons).toHaveLength(2);
    });

    it("renders the correct active language", () => {
        render(
            <LanguageToggle
            options={options}
            activeLanguage="en"
            onChangeLanguage={() => { }}
            />
        );
        const activeButton = screen.getByRole('button', { name: "English" });
        expect(activeButton).toBeInTheDocument();
    });

    it("calls onChangeLanguage with the correct code when a language button is clicked", async () => {
        const mockOnChangeLanguage = vi.fn();
        const user = userEvent.setup();
        render(
            <LanguageToggle
            options={options}
            activeLanguage="en"
            onChangeLanguage={mockOnChangeLanguage}
            />
        );
        const spanishButton = screen.getByRole('button', { name: "Spanish" });
        await user.click(spanishButton);
        expect(mockOnChangeLanguage).toHaveBeenCalledWith("es");
    });

    it("marks the correct language as pressed for screen readers", () => {
        render(
            <LanguageToggle
                options={options}
                activeLanguage="en"
                onChangeLanguage={() => { }}
            />
        );
        const englishButton = screen.getByRole('button', { name: "English" });
        const spanishButton = screen.getByRole('button', { name: "Spanish" });

        expect(englishButton).toHaveAttribute('aria-pressed', 'true');
        expect(spanishButton).toHaveAttribute('aria-pressed', 'false');
    });

    it("applies secondary variant styles to the active language", () => {
        render(
            <LanguageToggle
                options={options}
                activeLanguage="es"
                onChangeLanguage={() => { }}
            />
        );
        const spanishButton = screen.getByRole('button', { name: "Spanish" });
        expect(spanishButton).toHaveClass("bg-secondary");
    });

    it("recognizes the active language even with region codes (e.g., en-US)", () => {
    render(
        <LanguageToggle
            options={options}
            activeLanguage="en-US"
            onChangeLanguage={() => { }}
        />
    );
    const englishButton = screen.getByRole('button', { name: "English" });
    expect(englishButton).toHaveAttribute('aria-pressed', 'true');
    });
});

