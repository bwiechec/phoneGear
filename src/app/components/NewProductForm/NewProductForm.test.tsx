// NewProductForm.test.tsx
import React from "react";
import ReactDOM from "react-dom";
import fetch from "node-fetch";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import NewProductForm from "./NewProductForm";
import { ICategory } from "@/app/lib/types/types";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

const mockCategories = [
  { id: "1", name: "Category1", parent: 0 },
  { id: "2", name: "Category2", parent: 0 },
];

describe("NewProductForm", () => {
  it("renders the form correctly", () => {
    act(() => {
      render(<NewProductForm categories={mockCategories} />);
    });

    expect(screen.getByLabelText(/Product Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    // Add assertions for other form elements
  });
});
