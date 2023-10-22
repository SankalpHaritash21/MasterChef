import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RestaurantMenu from "../RestaurantMenu";
import mockData from "../mocks/mockResMenu.json";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => "",
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData),
  })
);

describe("RestaurantMenu Component", () => {
  test("it renders restaurant menu component and handles 'Add to Cart'", async () => {
    render(
      <Provider store={appStore}>
        <RestaurantMenu />
      </Provider>
    );

    // Ensure the component is loading
    const shimmerElement = screen.getByTestId("shimmer-loader");
    expect(shimmerElement).toBeInTheDocument();

    // Wait for the component to finish loading
    await waitFor(() => {
      expect(screen.queryByTestId("shimmer-loader")).not.toBeInTheDocument();
    });

    // Verify that the restaurant name and menu items are displayed
    expect(screen.getByText("Test Restaurant")).toBeInTheDocument();
    expect(screen.getAllByTestId("foodItems")).toHaveLength(2); // Assuming 2 menu items in the mock data

    // Find and click the "Add to Cart" button
    const addButton = screen.getAllByRole("button", { name: /add\+/i })[0];
    fireEvent.click(addButton);

    // Verify that the 'dispatch' function was called with the expected arguments
    expect(dispatchMock).toHaveBeenCalledWith(
      expect.objectContaining({ type: "cart/addItem" })
    );

    // Verify that the "Cart is Empty" message is not displayed
    expect(
      screen.queryByText("Cart is Empty. Add items to cart")
    ).not.toBeInTheDocument();
  });
});
