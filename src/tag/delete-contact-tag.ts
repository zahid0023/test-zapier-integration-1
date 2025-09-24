import {
  defineInputFields,
  defineCreate,
  type CreatePerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";

const inputFields = defineInputFields([
  { key: "contactId", label: "Contact ID", type: "string", required: true },
  { key: "tags", label: "Tags", type: "string", list: true },
]);

const perform = (async (z, bundle) => {
  const { contactId, ...body } = bundle.inputData;
  const response = await z.request({
    method: "DELETE",
    url: `${ENV.API_URL}/contacts/${contactId}/tags`,
    body,
  });
  // this should return a single object
  return response.data;
}) satisfies CreatePerform<InferInputData<typeof inputFields>>;

export const deleteContactTag = defineCreate({
  key: "deleteContactTag",
  noun: "Contact Tag",

  display: {
    label: "Delete Contact Tag",
    description: "Deletes an existing contact tag",
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
