import {
  defineInputFields,
  defineSearch,
  type SearchPerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";

const inputFields = defineInputFields([
  {
    key: "searchTerm",
    label: "Search Term",
    type: "string",
    helpText: "search for any post by name",
  },
  {
    key: "limit",
    label: "Limit",
    type: "string",
    required: true,
    helpText: "Number of authors to show in the listing",
  },
  {
    key: "skip",
    label: "Skip",
    type: "string",
    required: true,
    helpText: "Number of authors to skip in listing",
  },
]);

const perform = (async (z, bundle) => {
  const response = await z.request({
    url: `${ENV.API_URL}/blogs/site/all?limit=${bundle.inputData.limit}&skip=${
      bundle.inputData.skip
    }${bundle.inputData.searchTerm ? `&search-term=${bundle.inputData.searchTerm}` : ""}`,
  });
  // this should return an array of objects (but only the first will be used)
  return [response.data];
}) satisfies SearchPerform<InferInputData<typeof inputFields>>;

export const getBlogs = defineSearch({
  key: "getBlogs",
  noun: "Blog",

  display: {
    label: "Get All Blogs",
    description: "Get all blogs",
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
