// Alert muestra un mensaje de alerta con estilos basados en el tipo (success, error, info).



import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Alert from "./Alert";

describe("Alert component", () => {
    it("renders the correct message based on the message prop", () => {
        render(<Alert type="success" message="Success Message" />);
        const alertMessage = screen.getByText("Success Message");
        expect(alertMessage).toBeInTheDocument();
    });

    it("renders the correct styles based on the type prop", () => {
        render(<Alert type="error" message="Error Message" />);
        const alertContainer = screen.getByRole("alert");
        expect(alertContainer).toHaveClass("border-red-300 bg-red-100 text-red-800");
    });

    it("renders the correct role and aria-live attributes based on the type prop", () => {
        render(<Alert type="error" message="Error Message" />);
        const alertContainer = screen.getByRole("alert");
        expect(alertContainer).toHaveAttribute("aria-live", "assertive");
    });

    it("renders the correct role and aria-live attributes for non-error types", () => {
        render(<Alert type="success" message="Success Message" />);
        const alertContainer = screen.getByRole("status");
        expect(alertContainer).toHaveAttribute("aria-live", "polite");
    });
});