import {
  defineInputFields,
  defineCreate,
  type CreatePerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";
import { TAGS_OPERATION_TYPE_ENUM } from "../enums/bulk.enum.js";

const inputFields = defineInputFields([
  { key: "type", label: "Type", type: "string", required: true, choices: TAGS_OPERATION_TYPE_ENUM },
  { key: "contacts", label: "Contacts", type: "string", required: true, list: true },
  { key: "tags", label: "Tags", type: "string", required: true, list: true },
  { key: "location_id", label: "Location ID", type: "string", required: false },
  { key: "remove_all_tags", label: "Remove All Tags", type: "boolean", required: false },
]);

const perform = (async (z, bundle) => {
  const { type, ...body } = bundle.inputData;
  const response = await z.request({
    method: "POST",
    url: `${ENV.API_URL}/contacts/bulk/tags/update/${type}`,
    body,
  });
  // this should return a single object
  return response.data;
}) satisfies CreatePerform<InferInputData<typeof inputFields>>;

export const updateContactsTags = defineCreate({
  key: "updateContactsTags",
  noun: "Bulk",

  display: {
    label: "Update Contacts Tags",
    description: "Updates tags for multiple contacts",
  },

  operation: {
    perform,
    inputFields,

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.

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
