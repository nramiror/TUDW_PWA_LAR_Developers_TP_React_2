import { describe, it, vi, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginIcon from "./LogIcon"; 

describe("LoginIcon component", () => {
    it("renders correctly as a button", () => {
        render(<LoginIcon onClick={() => {}} />);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    });

    it("triggers the onClick prop when clicked", () => {
        const onClickMock = vi.fn();
        render(<LoginIcon onClick={onClickMock} />);
        
        const button = screen.getByRole("button");
        fireEvent.click(button);
        
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
});