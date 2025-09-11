import { describe, expect, it } from "vitest";
import zapier from "zapier-platform-core";

import App from "../../index";
import { sampleInputData } from "../../creates/contact";

const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe("creates.contact", () => {
  it("should run", async () => {
    const bundle = { inputData: sampleInputData };

    const results = await appTester(
      App.creates["createContact"].operation.perform,
      bundle
    );
    expect(results).toBeDefined();
    // TODO: add more assertions
  });
});
