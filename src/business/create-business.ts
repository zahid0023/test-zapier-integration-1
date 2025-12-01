import {
  defineInputFields,
  defineCreate,
  type CreatePerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";

const inputFields = defineInputFields([
  { key: "name", label: "Name", type: "string", required: true },
  { key: "phone", label: "Phone", type: "string" },
  { key: "email", label: "Email", type: "string" },
  { key: "website", label: "Website", type: "string" },
  { key: "address", label: "Address", type: "string" },
  { key: "city", label: "City", type: "string" },
  { key: "postal_code", label: "Postal Code", type: "string" },
  { key: "state", label: "State", type: "string" },
  { key: "country", label: "Country", type: "string" },
  { key: "description", label: "Description", type: "text" },
]);

// create a particular calendar by name
const perform = (async (z, bundle) => {
  const response = await z.request({
    method: "POST",
    url: `${ENV.API_URL}/businesses`,
    body: bundle.inputData,
  });
  // this should return a single object
  return response.data;
}) satisfies CreatePerform<InferInputData<typeof inputFields>>;

export const createBusiness = defineCreate({
  key: "createBusiness",
  noun: "Business",

  display: {
    label: "Create Business",
    description: "Creates a new business",
  },

  operation: {
    perform,

    // `inputFields` defines the fields a user could provide
    // Zapier will pass them in as `bundle.inputData` later. They're optional.
    // End-users will map data into these fields. In general, they should have any fields that the API can accept. Be sure to accurately mark which fields are required!
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
