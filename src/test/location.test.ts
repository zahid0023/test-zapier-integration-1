import { describe, expect, it } from "vitest";
import zapier from "zapier-platform-core";

import App from "../index";
import { ENV } from "../config/env";

const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe("location", () => {
  const authData = { apiKey: ENV.AUTH_DATA_API_KEY };
  let testedData: any = null;

  it("create: should create a location", async () => {
    const bundle = {
      authData,
      inputData: App.creates["createLocation"].operation.sample,
    };

    const result: any = await appTester(
      App.creates["createLocation"].operation.perform as any,
      bundle
    );

    expect(result).toBeDefined();
    expect(result).toHaveProperty("id");

    testedData = result;
  });

  it("search: should find location", async () => {
    const bundle = {
      authData,
      inputData: { locationId: testedData.id },
    };

    const results = await appTester(App.searches["location"].operation.perform as any, bundle);
    expect(results).toBeDefined();
  });

  it("update: should modify location", async () => {
    const bundle = {
      authData,
      inputData: {
        locationId: testedData.id,
        name: "Updated Test Location 1",
      },
    };

    const result = await appTester(App.creates["updateLocation"].operation.perform as any, bundle);
    expect(result).toBeDefined();
  });

  it("delete: should remove location", async () => {
    const bundle = {
      authData,
      inputData: { locationId: testedData.id },
    };

    const result = await appTester(App.creates["deleteLocation"].operation.perform as any, bundle);
    expect(result).toBeDefined();
    testedData = null;
  });
});
