import { describe, expect, it } from "vitest";
import zapier from "zapier-platform-core";

import App from "../index";
import { ENV } from "../config/env";

const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe("user", () => {
  const authData = { apiKey: ENV.AUTH_DATA_API_KEY };
  let testedUser: any = null;

  it("create: should create a user", async () => {
    const bundle = {
      authData,
      inputData: App.creates["createUser"].operation.sample,
    };

    const result: any = await appTester(App.creates["createUser"].operation.perform as any, bundle);

    console.log("Created User:", result);

    expect(result).toBeDefined();

    testedUser = result;
  });

  it("search: should find all users", async () => {
    const bundle = { authData };

    const results = await appTester(App.searches["getUsers"].operation.perform as any, bundle);
    expect(results).toBeDefined();
  });

  it("search: should find user", async () => {
    const bundle = {
      authData,
      inputData: { userId: testedUser.id },
    };

    const results = await appTester(App.searches["getUser"].operation.perform as any, bundle);
    expect(results).toBeDefined();
  });

  it("update: should modify user", async () => {
    const bundle = {
      authData,
      inputData: {
        userId: testedUser.id,
        company_id: ENV.TEST_COMPANY_ID,
        first_name: "Test Update",
        last_name: "User Update",
        email: "test.user1@example.com",
        pass: "securepassword123",
        type: "account",
        role: "admin",
      },
    };

    const result = await appTester(App.creates["updateUser"].operation.perform as any, bundle);
    expect(result).toBeDefined();
  });

  it("delete: should remove user", async () => {
    const bundle = {
      authData,
      inputData: { userId: testedUser.id },
    };

    const result = await appTester(App.creates["deleteUser"].operation.perform as any, bundle);
    expect(result).toBeDefined();
    testedUser = null;
  });
});
