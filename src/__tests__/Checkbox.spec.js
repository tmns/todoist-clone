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
