import {
  defineInputFields,
  defineCreate,
  type CreatePerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";

const inputFields = defineInputFields([
  {
    key: "opportunityId",
    required: true,
    type: "string",
    label: "Opportunity ID",
    helpText: "Get the Opportunity ID from the 'Search Opportunity' action.",
  },
]);

const perform = (async (z, bundle) => {
  const response = await z.request({
    method: "DELETE",
    url: `${ENV.API_URL}/opportunities/${bundle.inputData.opportunityId}`,
  });
  return response.data;
}) satisfies CreatePerform<InferInputData<typeof inputFields>>;

export const deleteOpportunity = defineCreate({
  key: "deleteOpportunity",
  noun: "Opportunity",

  display: {
    label: "Delete Opportunity",
    description: "Delete an Opportunity by ID",
  },

  operation: {
    perform,
    inputFields,
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
      // { key: "id", label: "Contact ID" },
      // { key: "name", label: "Contact Name" },
    ],
  },
});
