import {
  defineInputFields,
  defineSearch,
  type SearchPerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";

const inputFields = defineInputFields([
  { key: "businessId", label: "Business ID", type: "string", required: true },
  // { key: "limit", label: "Limit",  type: "string", default: "25" },
  // { key: "skip", label: "Skip", type: "string", default: "0" },
  // { key: "q", label: "Contact ID", type: "string", required: true },
]);

// find a particular contact by name
const perform = (async (z, bundle) => {
  const response = await z.request({
    url: `${ENV.API_URL}/contacts/business/${bundle.inputData.businessId}`,
  });
  // this should return an array of objects (but only the first will be used)
  return [response.data];
}) satisfies SearchPerform<InferInputData<typeof inputFields>>;

export const getContactsByBusinessId = defineSearch({
  key: "getContactsByBusinessId",
  noun: "Contact",

  display: {
    label: "Get Contacts",
    description: "Get all Contacts by Business ID",
  },

  operation: {
    perform,

    // `inputFields` defines the fields a user could provide
    // Zapier will pass them in as `bundle.inputData` later. Searches need at least one `inputField`.
    inputFields,

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    // sample: {
    //   contactId: "EQxIDXR6FovelHfwWmWB",
    // } satisfies InferInputData<typeof inputFields>,

    // If fields are custom to each user (like spreadsheet columns), `outputFields` can create human labels
    // For a more complete example of using dynamic fields see
    // https://github.com/zapier/zapier-platform/tree/main/packages/cli#customdynamic-fields
    // Alternatively, a static field definition can be provided, to specify labels for the fields
    outputFields: [
      // these are placeholders to match the example `perform` above
      { key: "id", label: "Contact ID" },
    ],
  },
});
