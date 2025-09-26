import { describe, expect, it } from "vitest";
import zapier from "zapier-platform-core";

import App from "../index";
import { ENV } from "../config/env";

const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe("custom value", () => {
  const authData = { apiKey: ENV.AUTH_DATA_API_KEY };
  let locationId = ENV.LOCATION_ID;
  let testedData: any = null;

  console.log("Using locationId:", locationId, authData);

  it("create: should create a custom value", async () => {
    const bundle = {
      authData,
      inputData: App.creates["createCustomValue"].operation.sample,
    };

    const result: any = await appTester(
      App.creates["createCustomValue"].operation.perform as any,
      bundle
    );

    console.log("Created Custom Value:", result);

    expect(result).toBeDefined();
    expect(result).toHaveProperty("customValue");

    testedData = result.customValue;
  });

  it("search: should find all custom values", async () => {
    const bundle = {
      authData,
      inputData: { locationId },
    };

    const results = await appTester(
      App.searches["getCustomValues"].operation.perform as any,
      bundle
    );
    expect(results).toBeDefined();
  });

  it("search: should find custom value", async () => {
    const bundle = {
      authData,
      inputData: { locationId, customValueId: testedData.id },
    };

    const results = await appTester(
      App.searches["getCustomValue"].operation.perform as any,
      bundle
    );
    expect(results).toBeDefined();
  });

  it("update: should modify custom value", async () => {
    const bundle = {
      authData,
      inputData: { locationId, customValueId: testedData.id, name: "Updated Custom Value 1" },
    };

    const result = await appTester(
      App.creates["updateCustomValue"].operation.perform as any,
      bundle
    );
    expect(result).toBeDefined();
  });

  it("delete: should remove custom value", async () => {
    const bundle = {
      authData,
      inputData: { locationId, customValueId: testedData.id },
    };

    const result = await appTester(
      App.creates["deleteCustomValue"].operation.perform as any,
      bundle
    );
    expect(result).toBeDefined();
    testedData = null;
  });
});
