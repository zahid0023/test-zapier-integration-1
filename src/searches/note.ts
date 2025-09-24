import {
  defineInputFields,
  defineSearch,
  type SearchPerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";

const inputFields = defineInputFields([
  { key: "contactId", label: "Contact ID", type: "string", required: true },
  { key: "noteId", label: "Note ID", type: "string", required: true },
]);

const perform = (async (z, bundle) => {
  const response = await z.request({
    url: `${ENV.API_URL}/contacts/${bundle.inputData.contactId}/notes/${bundle.inputData.noteId}`,
  });
  // this should return an array of objects (but only the first will be used)
  return [response.data.note];
}) satisfies SearchPerform<InferInputData<typeof inputFields>>;

export default defineSearch({
  key: "note",
  noun: "Note",

  display: {
    label: "Get Note",
    description: "Get a Note by ID",
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
