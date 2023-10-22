import Header from "../Header";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";

// Mock the image import
jest.mock("../Images/master.webp", () => "master.webp");

it("Should render Header Component with a login button", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const loginButton = screen.getByRole("button", { name: "Login" });
  // const loginButton1 = screen.getByText("Login");
  expect(loginButton).toBeInTheDocument();
  //expect(loginButton1).toBeInTheDocument();
});

it("Should render Header Component with carte item 0", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const About = screen.getByText(/0/); //regix
  expect(About).toBeInTheDocument();
});

it("Should change login button to logout on click", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const loginButton = screen.getByRole("button", { name: "Login" });
  fireEvent.click(loginButton);
  const logoutButton = screen.getByRole("button", { name: "Logout" });
  expect(loginButton).toBeInTheDocument();
  expect(logoutButton).toBeInTheDocument();
});
