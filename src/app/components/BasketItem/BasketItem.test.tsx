// BasketItem.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BasketItem from "./BasketItem";
import userEvent from "@testing-library/user-event";

describe("BasketItem", () => {
  const mockBasketItem = {
    product: {
      id: "1",
      description: "test",
      isBestseller: false,
      isNew: false,
      name: "Test Product",
      imageUrl: "https://example.com/test-image-url.jpg",
      price: 10,
      currency: "USD",
      category: "1",
      subcategory: "3",
    },
    quantity: 3,
  };

  it("renders BasketItem component", () => {
    render(<BasketItem basketItem={mockBasketItem} />);

    // Add your assertions based on the rendered component
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    // Add more assertions as needed
  });

  it("handles item delete", () => {
    const handleItemDeleteMock = jest.fn();

    render(
      <BasketItem
        basketItem={mockBasketItem}
        handleItemDelete={handleItemDeleteMock}
      />
    );

    // Simulate a click on the delete button
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    // Assert that the handleItemDeleteMock function was called with the correct argument
    expect(handleItemDeleteMock).toHaveBeenCalledWith(mockBasketItem.product);
  });
});
