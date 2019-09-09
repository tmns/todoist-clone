import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import { AddTask } from "../components/AddTask";
import { firebase } from "../firebase";
import { useSelectedProjectValue } from "../context";

beforeEach(cleanup);

jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: 1 })),
  useProjectsValue: jest.fn(() => ({ projects: [] }))
}));

jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve("Never mock firebase"))
      }))
    }))
  }
}));

describe("<AddTask />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Success", () => {
    it("renders the <AddTask />", () => {
      const { queryByTestId } = render(<AddTask />);
      expect(queryByTestId("add-task-comp")).toBeTruthy();
    });

    it("renders the <AddTask /> quick overlay", () => {
      const setShowQuickAddTask = jest.fn();
      const { queryByTestId } = render(
        <AddTask
          showAddTaskMain
          shouldShowMain={false}
          showQuickAddTask
          setShowQuickAddTask={setShowQuickAddTask}
        />
      );

      expect(queryByTestId("quick-add-task")).toBeTruthy();
    });

    it("renders the <AddTask /> main showable when clicked", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();
    });

    it("renders the <AddTask /> main showable on Enter keypress", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.keyPress(queryByTestId("show-main-action"), {
        key: "Enter",
        charCode: 13
      });
      expect(queryByTestId("add-task-main")).toBeTruthy();
    });

    it("renders the <AddTask /> project overlay when clicked", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.click(queryByTestId("show-project-overlay"));
      expect(queryByTestId("show-project-overlay")).toBeTruthy();
    });

    it("renders the <AddTask /> project overlay on Enter keypress", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.keyPress(queryByTestId("show-main-action"), {
        key: "Enter",
        charCode: 13
      });
      expect(queryByTestId("show-project-overlay")).toBeTruthy();
    });

    it("renders the <AddTask /> task date overlay onclick", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.click(queryByTestId("show-task-date-overlay"));
      expect(queryByTestId("task-date-overlay")).toBeTruthy();
    });

    it("renders the <AddTask /> task date overlay on Enter keypress", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.keyPress(queryByTestId("show-main-action"), {
        key: "Enter",
        charCode: 13
      });
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.keyPress(queryByTestId("show-task-date-overlay"), {
        key: "Enter",
        charCode: 13
      });
      expect(queryByTestId("task-date-overlay")).toBeTruthy();
    });

    it("hides the <AddTask /> main when cancel is clicked using onclick", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.click(queryByTestId("add-task-main-cancel"));
      expect(queryByTestId("add-task-main")).toBeFalsy();
    });

    it("hides the <AddTask /> main when cancel is Enter keypress'd", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.keyPress(queryByTestId("show-main-action"), {
        key: "Enter",
        charCode: 13
      });
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.keyPress(queryByTestId("add-task-main-cancel"), {
        key: "Enter",
        charCode: 13
      });
      expect(queryByTestId("add-task-main")).toBeFalsy();
    });
  });
});
