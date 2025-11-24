import { defineTrigger, type PollingTriggerPerform } from "zapier-platform-core";
import { ENV } from "../config/env.js";

const perform = (async (z, bundle) => {
  // `bundle.inputData` typed as `{ country?: string }`
  const response = await z.request(`${ENV.API_URL}/workflows`);
  return response.data.workflows;
}) as PollingTriggerPerform;

export default defineTrigger({
  key: "workflows",
  noun: "Workflows",

  display: {
    label: "New Workflow",
    description: "Triggers when a new workflow is created.",
    hidden: true,
  },

  operation: {
    type: "polling",
    perform,
  },
});
