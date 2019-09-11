import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import { Header } from "../components/layout/Header";

jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: 1 })),
  useProjectsValue: jest.fn(() => ({ projects: [] }))
}));

beforeEach(cleanup);

describe("<Header />", () => {
  describe("Success", () => {
    it("renders the header component", () => {
      const { queryByTestId } = render(<Header />);
      expect(queryByTestId("header")).toBeTruthy();
    });

    it("renders the header component and activates dark mode using onclick", () => {
      const darkMode = false;
      const setDarkMode = jest.fn(() => !darkMode);

      const { queryByTestId } = render(
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      );
      expect(queryByTestId("header")).toBeTruthy();

      fireEvent.click(queryByTestId("dark-mode-action"));
      expect(setDarkMode).toHaveBeenCalledWith(true);
    });

    it("renders the header component and activates dark mode using Enter keypress", () => {
      const darkMode = false;
      const setDarkMode = jest.fn(() => !darkMode);

      const { queryByTestId } = render(
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      );
      expect(queryByTestId("header")).toBeTruthy();

      fireEvent.keyPress(queryByTestId("dark-mode-action"), {
        key: "Enter",
        charCode: 13
      });
      expect(setDarkMode).toHaveBeenCalledWith(true);

      fireEvent.keyPress(queryByTestId("dark-mode-action"), {
        key: "Enter",
        charCode: 13
      });
      expect(setDarkMode).toHaveBeenCalledTimes(2);
    });

    it("renders the header component and set quick add task to true using onclick", () => {
      const darkMode = false;

      const { queryByTestId } = render(<Header darkMode={darkMode} />);
      expect(queryByTestId("header")).toBeTruthy();

      fireEvent.click(queryByTestId("quick-add-task-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();
    });

    it("renders the header component and set quick add task to true using Enter keypress", () => {
      const darkMode = false;

      const { queryByTestId } = render(<Header darkMode={darkMode} />);
      expect(queryByTestId("header")).toBeTruthy();

      fireEvent.keyPress(queryByTestId("quick-add-task-action"), {
        key: "Enter",
        charCode: 13
      });
      expect(queryByTestId("add-task-main")).toBeTruthy();
    });

    it("renders the header component and set quick add task to true and then false using Enter keypress", () => {
      const darkMode = false;

      const { queryByTestId } = render(<Header darkMode={darkMode} />);
      expect(queryByTestId("header")).toBeTruthy();

      fireEvent.keyPress(queryByTestId("quick-add-task-action"), {
        key: "Enter",
        charCode: 13
      });
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.keyPress(queryByTestId("add-task-quick-cancel"), {
        key: "Enter",
        charCode: 13
      });
      expect(queryByTestId("add-task-main")).toBeFalsy();
    });
  });
});
