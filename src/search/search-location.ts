import {
  defineInputFields,
  defineSearch,
  type SearchPerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";
import { SEARCH_ORDER_ENUM } from "../enums/search.enum.js";

const inputFields = defineInputFields([
  { key: "companyId", label: "Company ID", type: "string" },
  { key: "email", label: "Email", type: "string" },
  { key: "limit", label: "Limit", type: "integer" },
  {
    key: "order",
    label: "Order",
    type: "string",
    default: "asc",
    choices: SEARCH_ORDER_ENUM,
  },
  { key: "skip", label: "Skip", type: "integer", default: "0" },
]);

const perform = (async (z, bundle) => {
  const { companyId, email, limit, order, skip } = bundle.inputData;
  const query = `${companyId ? `company-id=${companyId}&` : ""}${email ? `email=${email}&` : ""}${
    limit ? `limit=${limit}&` : ""
  }${order ? `order=${order}&` : ""}${skip ? `skip=${skip}&` : ""}`;

  const response = await z.request({
    url: `${ENV.API_URL}/locations/search?${query}`,
  });
  // this should return an array of objects (but only the first will be used)
  return [response.data];
}) satisfies SearchPerform<InferInputData<typeof inputFields>>;

export const searchLocation = defineSearch({
  key: "searchLocation",
  noun: "Location",

  display: {
    label: "Search Location",
    description: "Search locations",
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
