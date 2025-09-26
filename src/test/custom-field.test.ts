import { describe, expect, it } from "vitest";
import zapier from "zapier-platform-core";

import App from "../index";
import { ENV } from "../config/env";

const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe("custom field", () => {
  const authData = { apiKey: ENV.AUTH_DATA_API_KEY };
  let locationId = ENV.LOCATION_ID;
  let testedData: any = null;

  console.log("Using locationId:", locationId, authData);

  it("create: should create a custom field", async () => {
    const bundle = {
      authData,
      inputData: App.creates["createCustomField"].operation.sample,
    };

    const result: any = await appTester(
      App.creates["createCustomField"].operation.perform as any,
      bundle
    );

    console.log("Created Custom Field:", result);

    expect(result).toBeDefined();
    expect(result).toHaveProperty("customField");

    testedData = result.customField;
  });

  it("search: should find all custom fields", async () => {
    const bundle = {
      authData,
      inputData: { locationId },
    };

    const results = await appTester(
      App.searches["getCustomFields"].operation.perform as any,
      bundle
    );
    expect(results).toBeDefined();
  });

  it("search: should find custom field", async () => {
    const bundle = {
      authData,
      inputData: { locationId, customFieldId: testedData.id },
    };

    const results = await appTester(
      App.searches["getCustomField"].operation.perform as any,
      bundle
    );
    expect(results).toBeDefined();
  });

  it("update: should modify custom field", async () => {
    const bundle = {
      authData,
      inputData: { locationId, customFieldId: testedData.id, name: "Updated Custom Field 1" },
    };

    const result = await appTester(
      App.creates["updateCustomField"].operation.perform as any,
      bundle
    );
    expect(result).toBeDefined();
  });

  it("delete: should remove custom field", async () => {
    const bundle = {
      authData,
      inputData: { locationId, customFieldId: testedData.id },
    };

    const result = await appTester(
      App.creates["deleteCustomField"].operation.perform as any,
      bundle
    );
    expect(result).toBeDefined();
    testedData = null;
  });
});
