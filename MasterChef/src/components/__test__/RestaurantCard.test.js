import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RestrauntCard, { withPromoted } from "../RestaurantCards";
import "@testing-library/jest-dom";
import React from "react";
import mock_Data from "../mocks/resCardMock.json";
import mock_Data1 from "../mocks/resCardMockPromoted.json";

//Unit testing:

it("Should render Restaurant Card component with props Data", () => {
  render(<RestrauntCard {...mock_Data} />);

  //check card render or not
  let res = screen.getByText("Third Wave Coffee");
  expect(res).toBeInTheDocument();
});
const RestrauntCardWithPromotion = withPromoted(RestrauntCard);
it("should render rescard component with promoted label", async () => {
  render(<RestrauntCardWithPromotion {...mock_Data1} />);

  // Verify that the "Promoted" label is present in the document-HOC
  const promotedLabel = screen.getByText("Promoted");
  expect(promotedLabel).toBeInTheDocument();
});
