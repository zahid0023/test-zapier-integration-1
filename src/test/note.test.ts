import { describe, expect, it } from "vitest";
import zapier from "zapier-platform-core";

import App from "../index";
import { ENV } from "../config/env";

const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe("note", () => {
  const authData = { apiKey: ENV.AUTH_DATA_API_KEY };
  let contactId = "ODUO6yJQiACv40RCkSmq";
  let testedData: any = null;

  it("create: should create a note", async () => {
    const bundle = {
      authData,
      inputData: App.creates["createNote"].operation.sample,
    };

    const result: any = await appTester(App.creates["createNote"].operation.perform as any, bundle);

    console.log("Created note:", result);

    expect(result).toBeDefined();
    expect(result).toHaveProperty("note");

    testedData = result.note;
  });

  it("search: should find all notes", async () => {
    const bundle = {
      authData,
      inputData: { contactId },
    };

    const results = await appTester(App.searches["getNotes"].operation.perform as any, bundle);
    expect(results).toBeDefined();
  });

  it("search: should find note", async () => {
    const bundle = {
      authData,
      inputData: { contactId, noteId: testedData.id },
    };

    const results = await appTester(App.searches["getNote"].operation.perform as any, bundle);
    expect(results).toBeDefined();
  });

  it("update: should modify note", async () => {
    const bundle = {
      authData,
      inputData: {
        contactId,
        noteId: testedData.id,
        body: "Updated Test Note 1",
      },
    };

    const result = await appTester(App.creates["updateNote"].operation.perform as any, bundle);
    expect(result).toBeDefined();
  });

  it("delete: should remove note", async () => {
    const bundle = {
      authData,
      inputData: { contactId, noteId: testedData.id },
    };

    const result = await appTester(App.creates["deleteNote"].operation.perform as any, bundle);
    expect(result).toBeDefined();
    testedData = null;
  });
});
