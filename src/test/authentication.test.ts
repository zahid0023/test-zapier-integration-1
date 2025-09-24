import { describe, expect, it } from "vitest";
import zapier from "zapier-platform-core";

import App from "../index.js";
import { ENV } from "../config/env.js";
const appTester = zapier.createAppTester(App);

describe("custom auth", () => {
  it("passes authentication and returns json", async () => {
    const bundle = {
      authData: {
        apiKey: ENV.AUTH_DATA_API_KEY,
      },
    };

    const response = await appTester(App.authentication.test, bundle);
    expect(response.status).toBe(200);
  });

  it("fails on bad auth", async () => {
    const bundle = {
      authData: {
        apiKey: "bad",
      },
    };

    try {
      await appTester(App.authentication.test, bundle);
    } catch (error) {
      expect(error.message).toThrowError("The API Key you supplied is incorrect");
      return;
    }
  });
});
