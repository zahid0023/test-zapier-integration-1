import {
  defineInputFields,
  defineSearch,
  type SearchPerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";

const inputFields = defineInputFields([
  {
    key: "query",
    label: "Query",
    type: "string",
    helpText: "Search query to filter custom menus by name, supports partial || full names",
  },
  { key: "limit", label: "Limit", type: "integer", default: "20" },
  { key: "skip", label: "Skip", type: "integer", default: "0" },
  {
    key: "showOnCompany",
    label: "Show On Company",
    type: "boolean",
    helpText:
      "Filter to show only agency-level menu links. When omitted, fetches both agency and sub-account menu links. Ignored if locationId is provided",
  },
]);

const perform = (async (z, bundle) => {
  const params = new URLSearchParams();
  for (const key in bundle.inputData) {
    if (bundle.inputData[key] !== undefined) {
      params.append(key, String(bundle.inputData[key]));
    }
  }

  const response = await z.request({
    url: `${ENV.API_URL}/custom-menu-links`,
    params: Object.fromEntries(params),
  });
  // this should return an array of objects (but only the first will be used)
  return [response.data];
}) satisfies SearchPerform<InferInputData<typeof inputFields>>;

export const getCustomMenuLinks = defineSearch({
  key: "getCustomMenuLinks",
  noun: "Custom Menu Link",

  display: {
    label: "Get All Custom Menu Links",
    description: "Get all custom menu links",
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
