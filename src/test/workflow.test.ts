import { describe, expect, it } from "vitest";
import zapier from "zapier-platform-core";

import App from "../index";
import { ENV } from "../config/env";

const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe("workflow", () => {
  const authData = { apiKey: ENV.AUTH_DATA_API_KEY };

  it("create: should create a workflow", async () => {
    const bundle = {
      authData,
      inputData: App.creates["addContactWorkflow"].operation.sample,
    };

    const result: any = await appTester(
      App.creates["addContactWorkflow"].operation.perform as any,
      bundle
    );

    console.log("Created Task:", result);

    expect(result).toBeDefined();
  });

  it("delete: should remove task", async () => {
    const bundle = {
      authData,
      inputData: App.creates["deleteContactWorkflow"].operation.sample,
    };

    const result = await appTester(
      App.creates["deleteContactWorkflow"].operation.perform as any,
      bundle
    );
    expect(result).toBeDefined();
  });
});
