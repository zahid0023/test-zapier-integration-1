import {
  defineInputFields,
  defineCreate,
  type CreatePerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";
import { OPPORTUNITY_STATUS } from "../enums/opportunity.enum.js";

const inputFields = defineInputFields([
  { key: "pipeline_id", label: "Pipeline ID", type: "string", required: true },
  { key: "contact_id", label: "Contact ID", type: "string", required: true },
  { key: "name", label: "Opportunity Name", type: "string" },
  { key: "status", label: "Status", type: "string", choices: OPPORTUNITY_STATUS },
  { key: "pipeline_stage_id", label: "Pipeline Stage ID", type: "string" },
  { key: "monetary_value", label: "Monetary Value", type: "number" },
  {
    key: "assigned_to",
    label: "Assigned To",
    type: "string",
    helpText: "Get the user ID from the 'Get All Users' action.",
  },
]);

const perform = (async (z, bundle) => {
  const response = await z.request({
    method: "POST",
    url: `${ENV.API_URL}/opportunities/upsert`,
    body: bundle.inputData,
  });
  // this should return a single object
  return response.data;
}) satisfies CreatePerform<InferInputData<typeof inputFields>>;

export const upsertOpportunity = defineCreate({
  key: "upsertOpportunity",
  noun: "Opportunity",

  display: {
    label: "Upsert Opportunity",
    description: "Creates or updates an opportunity",
  },

  operation: {
    perform,
    inputFields,

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
      id: 1,
      name: "Test",
    },

    // If fields are custom to each user (like spreadsheet columns), `outputFields` can create human labels
    // For a more complete example of using dynamic fields see
    // https://github.com/zapier/zapier-platform/tree/main/packages/cli#customdynamic-fields
    // Alternatively, a static field definition can be provided, to specify labels for the fields
    outputFields: [
      // these are placeholders to match the example `perform` above
      // {key: 'id', label: 'Person ID'},
      // {key: 'name', label: 'Person Name'}
    ],
  },
});
