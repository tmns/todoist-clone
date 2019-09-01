import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import { Checkbox } from "../components/Checkbox";

beforeEach(cleanup); // clean the DOM

jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          update: jest.fn()
        }))
      }))
    }))
  }
}));

describe("<Checkbox />", () => {
  describe("Success", () => {
    it("renders the task checkbox", () => {
      const { queryByTestId } = render(
        <Checkbox id="1" taskDesc="test task description" />
      );
      expect(queryByTestId("checkbox-action")).toBeTruthy();
    });

    it("renders the task checkbox and accepts a click", () => {
      const { queryByTestId } = render(
        <Checkbox id="1" taskDesc="test task description" />
      );
      expect(queryByTestId("checkbox-action")).toBeTruthy();
      fireEvent.click(queryByTestId("checkbox-action"));
    });

    it("renders the task checkbox and accepts a key press", () => {
      const { queryByTestId } = render(
        <Checkbox id="1" taskDesc="test task description" />
      );
      expect(queryByTestId("checkbox-action")).toBeTruthy();
      fireEvent.keyPress(queryByTestId("checkbox-action"));
    });
  });
});
