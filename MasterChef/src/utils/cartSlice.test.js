import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { addItem, removeItem, clearCart } from "./cartSlice";

describe("cartSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });
  });

  it("should add an item to the cart", () => {
    store.dispatch(addItem({ id: 1, name: "Product 1" }));
    const items = store.getState().cart.items;
    expect(items).toHaveLength(1);
    expect(items[0].name).toBe("Product 1");
  });

  it("should remove the last item from the cart", () => {
    store.dispatch(addItem({ id: 1, name: "Product 1" }));
    store.dispatch(addItem({ id: 2, name: "Product 2" }));

    store.dispatch(removeItem());
    const items = store.getState().cart.items;
    expect(items).toHaveLength(1);
    expect(items[0].name).toBe("Product 1");
  });

  it("should clear the cart", () => {
    store.dispatch(addItem({ id: 1, name: "Product 1" }));
    store.dispatch(addItem({ id: 2, name: "Product 2" }));

    store.dispatch(clearCart());
    const items = store.getState().cart.items;
    expect(items).toHaveLength(0);
  });
});
