import { describe, expect, it } from "vitest";
import zapier from "zapier-platform-core";

import App from "../index";
import { ENV } from "../config/env";

const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe("contact", () => {
  const authData = { apiKey: ENV.AUTH_DATA_API_KEY };
  let testedContact: any = null;

  it("create: should create a contact", async () => {
    const bundle = {
      authData,
      inputData: App.creates["createContact"].operation.sample,
    };

    const result: any = await appTester(
      App.creates["createContact"].operation.perform as any,
      bundle
    );

    expect(result).toBeDefined();
    expect(result).toHaveProperty("contact");

    testedContact = result.contact;
  });

  it("search: should find contact", async () => {
    const bundle = {
      authData,
      inputData: { contactId: testedContact.id },
    };

    const results = await appTester(App.searches["contact"].operation.perform as any, bundle);
    expect(results).toBeDefined();
  });

  // it("update: should modify contact", async () => {
  //   const bundle = {
  //     authData,
  //     inputData: {
  //       contactId: testedContact.id,
  //       email: "updated@example.com",
  //       name: "Updated Name",
  //     },
  //   };

  //   const result = await appTester(App.creates["updateContact"].operation.perform as any, bundle);
  //   expect(result).toBeDefined();
  // });

  it("delete: should remove contact", async () => {
    const bundle = {
      authData,
      inputData: { contactId: testedContact.id },
    };

    const result = await appTester(App.creates["deleteContact"].operation.perform as any, bundle);
    expect(result).toBeDefined();
    testedContact = null;
  });
});
