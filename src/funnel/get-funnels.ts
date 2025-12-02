import {
  defineInputFields,
  defineSearch,
  type SearchPerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";

const inputFields = defineInputFields([
  { key: "type", label: "Type", type: "string" },
  { key: "category", label: "Category", type: "string" },
  { key: "parentId", label: "Parent ID", type: "string" },
  { key: "name", label: "Name", type: "string" },
  { key: "limit", label: "Limit", type: "integer" },
  { key: "offset", label: "Offset", type: "integer" },
]);

const perform = (async (z, bundle) => {
  const { type, category, parentId, name, limit, offset } = bundle.inputData;
  const response = await z.request({
    url: `${ENV.API_URL}/funnels/redirects/list?${type ? `type=${type}&` : ""}${
      category ? `category=${category}&` : ""
    }${parentId ? `parent-id=${parentId}&` : ""}${name ? `name=${name}&` : ""}${
      limit ? `limit=${limit}&` : ""
    }${offset ? `offset=${offset}` : ""}`,
  });
  // this should return an array of objects (but only the first will be used)
  return [response.data];
}) satisfies SearchPerform<InferInputData<typeof inputFields>>;

export const getFunnelRedirects = defineSearch({
  key: "getFunnelRedirects",
  noun: "Funnel Redirect",

  display: {
    label: "Get All Funnel Redirects",
    description: "Get all funnel redirects",
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
    ],
  },
});
