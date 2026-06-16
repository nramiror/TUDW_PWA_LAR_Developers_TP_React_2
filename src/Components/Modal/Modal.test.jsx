import { describe, it, vi, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";


describe("Modal component", () => {
    it("does not render anything when isOpen is false", () => {
        render(
            <Modal isOpen={false} onClose={() => {}}>
                <div data-testid="modal-content">Content</div>
            </Modal>
        );
        const content = screen.queryByTestId("modal-content");
        expect(content).not.toBeInTheDocument();
    });

    it("renders the children and close button when isOpen is true", () => {
        render(
            <Modal isOpen={true} onClose={() => {}}>
                <div data-testid="modal-content">Content</div>
            </Modal>
        );
        const content = screen.getByTestId("modal-content");
        const closeButton = screen.getByRole("button", { name: /close modal/i });
        
        expect(content).toBeInTheDocument();
        expect(closeButton).toBeInTheDocument();
    });

    it("calls onClose when the close button is clicked", () => {
        const onCloseMock = vi.fn(); 
        render(
            <Modal isOpen={true} onClose={onCloseMock}>
                <div>Content</div>
            </Modal>
        );
        
        const closeButton = screen.getByRole("button", { name: /close modal/i });
        fireEvent.click(closeButton);
        
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});