import { describe, it, vi, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key, defaultValue) => defaultValue }),
}));

describe("LoginForm component", () => {
    it("renders email and password inputs and the submit button", () => {
        render(<LoginForm onSuccess={() => {}} />);
        
        expect(screen.getByPlaceholderText("example@games.com")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    });

    it("updates input values when typing", () => {
        render(<LoginForm onSuccess={() => {}} />);
        
        const emailInput = screen.getByPlaceholderText("example@games.com");
        const passwordInput = screen.getByPlaceholderText("••••••••");

        fireEvent.change(emailInput, { target: { value: "test@lar.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        expect(emailInput.value).toBe("test@lar.com");
        expect(passwordInput.value).toBe("password123");
    });

    it("shows an error message when fields are empty on submit", () => {
        render(<LoginForm onSuccess={() => {}} />);
        
        const submitButton = screen.getByRole("button", { name: /sign in/i });
        fireEvent.click(submitButton);

        const errorMessage = screen.getByText("All fields are required");
        expect(errorMessage).toBeInTheDocument();
    });
});