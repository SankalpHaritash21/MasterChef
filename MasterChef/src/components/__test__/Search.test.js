import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Body from "../Body";
import "@testing-library/jest-dom";
import React from "react";
import data from "../mocks/mockResListData.json";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

global.fetch = jest.fn(() => {
  //created mock fetch function
  return Promise.resolve({
    json: () => {
      return Promise.resolve(data);
    },
  });
});

it("Should render Body compomnent with search component", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );

  const searchBtn = screen.getByRole("button", { name: "Search" });
  const searchInput = screen.getByTestId("searchInput");
  const cardBeforeSearch = screen.getAllByTestId("resCard");

  fireEvent.change(searchInput, { target: { value: "burger" } });
  fireEvent.click(searchBtn);
  expect(searchBtn).toBeInTheDocument();
  const cardAfterSearch = screen.getAllByTestId("resCard");

  expect(cardBeforeSearch.length).toBe(9);
  expect(cardAfterSearch.length).toBe(1);
});

it("render body with Top Rated Restaurant", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );
  const cardBeforeFilter = screen.getAllByTestId("resCard");
  expect(cardBeforeFilter.length).toBe(9);

  const topRated = screen.getAllByTestId("resCard");
  expect(topRated.length).toBe(9);
});
