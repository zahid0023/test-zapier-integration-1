import { describe, expect, it } from "vitest";
import zapier from "zapier-platform-core";

import App from "../index";
import { ENV } from "../config/env";

const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe("tag (location)", () => {
  const authData = { apiKey: ENV.AUTH_DATA_API_KEY };
  let locationId = ENV.LOCATION_ID;
  let testedTag: any = null;

  it("create: should create a location tag", async () => {
    const bundle = {
      authData,
      inputData: App.creates["createLocationTag"].operation.sample,
    };

    const result: any = await appTester(
      App.creates["createLocationTag"].operation.perform as any,
      bundle
    );

    console.log("Created Location Tag:", result);

    expect(result).toBeDefined();
    expect(result).toHaveProperty("tag");

    testedTag = result.tag;
  });

  it("search: should find all tags", async () => {
    const bundle = {
      authData,
      inputData: { locationId },
    };

    const results = await appTester(
      App.searches["getLocationTags"].operation.perform as any,
      bundle
    );
    expect(results).toBeDefined();
  });

  it("search: should find tag", async () => {
    const bundle = {
      authData,
      inputData: { locationId, tagId: testedTag.id },
    };

    const results = await appTester(
      App.searches["getLocationTag"].operation.perform as any,
      bundle
    );
    expect(results).toBeDefined();
  });

  it("update: should modify tag", async () => {
    const bundle = {
      authData,
      inputData: { locationId, tagId: testedTag.id, name: "Updated Test Location Tag 1" },
    };

    const result = await appTester(
      App.creates["updateLocationTag"].operation.perform as any,
      bundle
    );
    expect(result).toBeDefined();
  });

  it("delete: should remove tag", async () => {
    const bundle = {
      authData,
      inputData: { locationId, tagId: testedTag.id },
    };

    const result = await appTester(
      App.creates["deleteLocationTag"].operation.perform as any,
      bundle
    );
    expect(result).toBeDefined();
    testedTag = null;
  });
});
