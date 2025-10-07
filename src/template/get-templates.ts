import {
  defineInputFields,
  defineSearch,
  type SearchPerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";

const inputFields = defineInputFields([
  { key: "locationId", label: "Location ID", type: "string", required: true },
  { key: "originId", label: "Origin ID", type: "string", required: true },
  { key: "deleted", label: "Deleted", type: "boolean" },
  { key: "limit", label: "Limit", type: "integer" },
  { key: "skip", label: "Skip", type: "integer" },
  { key: "type", label: "Type", type: "string" },
]);

const perform = (async (z, bundle) => {
  const response = await z.request({
    url: `${ENV.API_URL}/templates?location-id=${bundle.inputData.locationId}&origin-id=${
      bundle.inputData.originId
    }${bundle.inputData.deleted ? `&deleted=${bundle.inputData.deleted}` : ""}${
      bundle.inputData.limit ? `&limit=${bundle.inputData.limit}` : ""
    }${bundle.inputData.skip ? `&skip=${bundle.inputData.skip}` : ""}${
      bundle.inputData.type ? `&type=${bundle.inputData.type}` : ""
    }`,
  });
  // this should return an array of objects (but only the first will be used)
  return [response.data];
}) satisfies SearchPerform<InferInputData<typeof inputFields>>;

export const getTemplates = defineSearch({
  key: "getTemplates",
  noun: "Template",

  display: {
    label: "Get Templates",
    description: "Get all Templates for a Contact",
  },

  operation: {
    perform,

    // `inputFields` defines the fields a user could provide
    // Zapier will pass them in as `bundle.inputData` later. Searches need at least one `inputField`.
    inputFields,

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
      locationId: ENV.LOCATION_ID,
      originId: ENV.TEST_ORIGIN_ID,
    } satisfies InferInputData<typeof inputFields>,

    // If fields are custom to each user (like spreadsheet columns), `outputFields` can create human labels
    // For a more complete example of using dynamic fields see
    // https://github.com/zapier/zapier-platform/tree/main/packages/cli#customdynamic-fields
    // Alternatively, a static field definition can be provided, to specify labels for the fields
    outputFields: [
      // these are placeholders to match the example `perform` above
      // { key: "id", label: "Contact ID" },
    ],
  },
});
