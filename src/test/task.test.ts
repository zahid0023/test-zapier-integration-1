import { describe, expect, it } from "vitest";
import zapier from "zapier-platform-core";

import App from "../index";
import { ENV } from "../config/env";

const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe("task", () => {
  const authData = { apiKey: ENV.AUTH_DATA_API_KEY };
  let contactId = ENV.TEST_CONTACT_ID;
  let testedTask: any = null;

  it("create: should create a task", async () => {
    const bundle = {
      authData,
      inputData: App.creates["createTask"].operation.sample,
    };

    const result: any = await appTester(App.creates["createTask"].operation.perform as any, bundle);

    console.log("Created Task:", result);

    expect(result).toBeDefined();
    expect(result).toHaveProperty("task");

    testedTask = result.task;
  });

  it("search: should find all tasks", async () => {
    const bundle = {
      authData,
      inputData: { contactId },
    };

    const results = await appTester(App.searches["getTasks"].operation.perform as any, bundle);
    expect(results).toBeDefined();
  });

  it("search: should find task", async () => {
    const bundle = {
      authData,
      inputData: { contactId, taskId: testedTask.id },
    };

    const results = await appTester(App.searches["getTask"].operation.perform as any, bundle);
    expect(results).toBeDefined();
  });

  it("update: should modify task", async () => {
    const bundle = {
      authData,
      inputData: {
        contactId,
        taskId: testedTask.id,
        title: "Updated Test Task 1",
        completed: true,
      },
    };

    const result = await appTester(App.creates["updateTask"].operation.perform as any, bundle);
    expect(result).toBeDefined();
  });

  it("delete: should remove task", async () => {
    const bundle = {
      authData,
      inputData: { contactId, taskId: testedTask.id },
    };

    const result = await appTester(App.creates["deleteTask"].operation.perform as any, bundle);
    expect(result).toBeDefined();
    testedTask = null;
  });
});
