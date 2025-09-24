import {
  defineInputFields,
  defineCreate,
  type CreatePerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";

const inputFields = defineInputFields([
  { key: "customFieldId", label: "Custom Field ID", type: "string", required: true },
  { key: "name", label: "Name", type: "string", required: true },
  { key: "placeholder", label: "Placeholder", type: "string" },
  { key: "accepted_format", label: "Accepted Format", type: "string", list: true },
  { key: "is_multiple_file", label: "Is Multiple File", type: "boolean" },
  { key: "max_number_of_files", label: "Max Number Of Files", type: "integer" },
  {
    key: "text_box_list_options",
    label: "Text Box List Options",
    children: [
      { key: "label", label: "Label", type: "string" },
      { key: "prefill_value", label: "Prefill Value", type: "string" },
    ],
  },
  { key: "position", label: "Position", type: "integer" },
  { key: "model", label: "Model", type: "string" },
]);

const perform = (async (z, bundle) => {
  const { customFieldId, ...body } = bundle.inputData;
  const response = await z.request({
    method: "PUT",
    url: `${ENV.API_URL}/custom-fields/${customFieldId}`,
    body,
  });
  // this should return a single object
  return response.data;
}) satisfies CreatePerform<InferInputData<typeof inputFields>>;

export default defineCreate({
  key: "updateCustomField",
  noun: "Update Custom Field",

  display: {
    label: "Update Custom Field",
    description: "Updates an existing custom field",
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
