import { describe, expect, it } from "vitest";
import zapier from "zapier-platform-core";

import App from "../index";
import { ENV } from "../config/env";

const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe("tag (contact)", () => {
  const authData = { apiKey: ENV.AUTH_DATA_API_KEY };
  let contactId = "ODUO6yJQiACv40RCkSmq";
  let testedTag: any = null;

  it("create: should create a tag", async () => {
    const bundle = {
      authData,
      inputData: App.creates["createContactTag"].operation.sample,
    };

    const result: any = await appTester(
      App.creates["createContactTag"].operation.perform as any,
      bundle
    );

    console.log("Created Tag:", result);

    expect(result).toBeDefined();
    expect(result).toHaveProperty("tags");

    testedTag = result.tags;
  });

  it("delete: should remove tags", async () => {
    const bundle = {
      authData,
      inputData: { contactId, tags: [testedTag[0]] },
    };

    const result = await appTester(
      App.creates["deleteContactTag"].operation.perform as any,
      bundle
    );
    expect(result).toBeDefined();
  });
});
