import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";

import { IndividualProject } from "../components/IndividualProject";

beforeEach(cleanup);

jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          delete: jest.fn(() =>
            Promise.resolve("Never mock firebase, but I did!")
          ),
          update: jest.fn()
        }))
      }))
    }))
  }
}));

jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => "INBOX")
  })),
  useProjectsValue: jest.fn(() => ({
    setProjects: jest.fn(),
    projects: [
      {
        name: "THE OFFICE",
        projectId: "1",
        userId: "jlIFXIwyAL3tzHMtzRbw",
        docId: "michael-scott"
      }
    ]  
  })),
}));

describe("<IndividualProject />", () => {
  const project = {
    name: "THE OFFICE",
    projectId: "1",
    userId: "jlIFXIwyAL3tzHMtzRbw",
    docId: "michael-scott"
  };

  describe("Success", () => {
    it("renders our project", () => {
      const { getByText } = render(<IndividualProject project={project} />);
      expect(getByText("THE OFFICE")).toBeTruthy();
    });

    it("renders the delete overlay and then deletes a project using onclick", () => {
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} />
      );

      fireEvent.click(queryByTestId("delete-project"));
      expect(
        getByText("Are you sure you want to delete this project?")
      ).toBeTruthy();

      fireEvent.click(getByText("Delete"));
    });

    it("renders the delete overlay and then deletes a project using Enter keypress", () => {
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} />
      );

      fireEvent.keyPress(queryByTestId("delete-project"), {
        key: "Enter",
        charCode: 13
      });
      expect(
        getByText("Are you sure you want to delete this project?")
      ).toBeTruthy();

      fireEvent.click(getByText("Delete"));
    });

    it("renders the delete overlay and then cancels using onclick", () => {
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} />
      );

      fireEvent.click(queryByTestId("delete-project"));
      expect(
        getByText("Are you sure you want to delete this project?")
      ).toBeTruthy();

      fireEvent.click(getByText("Cancel"));
    });

    it("renderes the delete overlay and then cancels on Enter keypress", () => {
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} />
      );

      fireEvent.keyPress(queryByTestId("delete-project"), {
        key: "Enter",
        charCode: 13
      });
      expect(
        getByText("Are you sure you want to delete this project?")
      ).toBeTruthy();

      fireEvent.keyPress(getByText("Cancel"), {
        key: "Enter",
        charCode: 13
      });
    });
  });
});
