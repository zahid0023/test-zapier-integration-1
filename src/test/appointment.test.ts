import { describe, expect, it } from "vitest";
import zapier from "zapier-platform-core";

import App from "../index";
import { ENV } from "../config/env";

const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe("appointment", () => {
  const authData = { apiKey: ENV.AUTH_DATA_API_KEY };

  it("get: should find all appointments by contact ID", async () => {
    const bundle = {
      authData,
      inputData: App.searches["getAppointments"].operation.sample,
    };

    const result: any = await appTester(
      App.searches["getAppointments"].operation.perform as any,
      bundle
    );

    console.log(result);

    expect(result).toBeDefined();
  });
});
