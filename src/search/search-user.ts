import {
  defineInputFields,
  defineSearch,
  type SearchPerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";
import { SEARCH_ORDER_ENUM } from "../enums/search.enum.js";
import { USER_ROLE, USER_TYPE } from "../enums/user.enum.js";

const inputFields = defineInputFields([
  {
    key: "companyId",
    label: "Company ID",
    type: "string",
    required: true,
    helpText: "Company ID in which the search needs to be performed",
  },
  { key: "enabled2waySync", label: "Enabled 2-Way Sync", type: "boolean" },
  {
    key: "ids",
    label: "IDs",
    type: "string",
    helpText: "List of User IDs to be filtered in the search (comma separated)",
  },
  {
    key: "q",
    label: "Query",
    type: "string",
    helpText: "The search term for the user is matched based on the user full name, email or phone",
  },
  { key: "type", label: "Type", type: "string", choices: USER_TYPE },
  { key: "role", label: "Role", type: "string", choices: USER_ROLE },
  { key: "skip", label: "Skip", type: "string", default: "0" },
  { key: "limit", label: "Limit", type: "string", default: "25" },
  {
    key: "sort",
    label: "Sort",
    type: "string",
    default: "asc",
    helpText:
      "The field on which sort is applied in which the results need to be sorted. Default is based on the first and last name",
  },
  { key: "sortDirection", label: "Sort Direction", type: "string", choices: SEARCH_ORDER_ENUM },
]);

const perform = (async (z, bundle) => {
  const { companyId, enabled2waySync, ids, q, type, role, skip, limit, sort, sortDirection } =
    bundle.inputData;

  const query = `company-id=${companyId}&${
    enabled2waySync ? `enabled2waySync=${enabled2waySync}&` : ""
  }${ids ? `ids=${ids}&` : ""}${q ? `query=${q}&` : ""}${type ? `type=${type}&` : ""}${
    role ? `role=${role}&` : ""
  }${skip ? `skip=${skip}&` : ""}${limit ? `limit=${limit}&` : ""}${sort ? `sort=${sort}&` : ""}${
    sortDirection ? `sort-direction=${sortDirection}&` : ""
  }`;

  const response = await z.request({
    url: `${ENV.API_URL}/users/search?${query}`,
  });
  // this should return an array of objects (but only the first will be used)
  return [response.data];
}) satisfies SearchPerform<InferInputData<typeof inputFields>>;

export const searchUser = defineSearch({
  key: "searchUser",
  noun: "User",

  display: {
    label: "Search User",
    description: "Search users",
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
