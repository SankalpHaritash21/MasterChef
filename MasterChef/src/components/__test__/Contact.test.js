import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";
import React from "react";
//Unit testing:

// Mock the image import
jest.mock("../Images/contact.png", () => "contact.png");

test("Should load contact us component", () => {
  render(<Contact />);
  const heading = screen.getByRole("heading");
  expect(heading).toBeInTheDocument();
});

test("Should contain button", () => {
  render(<Contact />);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

it("Should contain Name textBox", () => {
  render(<Contact />);
  const nameInput = screen.getByPlaceholderText("Name");
  const emailInput = screen.getByPlaceholderText("Email");
  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

it("Should load 2 input boxes on contact component", () => {
  render(<Contact />);
  const inputBox = screen.getAllByRole("textbox");
  const inputBoxes = screen.getAllByPlaceholderText(/Name|Email/);
  //console.log(inputBox[0]);
  expect(inputBoxes).toHaveLength(2);
  expect(inputBox.length).toBe(3);
});

test("Should render the image", () => {
  render(<Contact />);
  const image = screen.getByAltText("contact");
  expect(image).toBeInTheDocument();
});

describe("Contact Component", () => {
  beforeAll(() => {
    // console.log("Before All");
  });

  beforeEach(() => {
    // console.log("Before Each");
  });

  afterAll(() => {
    // console.log("After All");
  });
  afterEach(() => {
    // console.log("After Each");
  });
  //describe is use to test multiple test together by grouping them
  it("Renders without errors", () => {
    render(<Contact />);
    // Assert that the component renders without errors
    expect(screen.getByText("Contact us")).toBeInTheDocument();
  });
});
