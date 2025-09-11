import {
  defineInputFields,
  defineCreate,
  type CreatePerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";

const inputFields = defineInputFields([
  { key: "contactId", label: "Contact ID", type: "string", required: true },
  { key: "taskId", label: "Task ID", type: "string", required: true },
  { key: "title", label: "Title", type: "string", required: true },
  { key: "body", label: "Body", type: "string", required: false },
  { key: "due_date", label: "Due Date", type: "string", required: false },
  { key: "due_time", label: "Due Time", type: "string", required: false },
  { key: "completed", label: "Completed", type: "boolean", required: false },
  { key: "assigned_to", label: "Assigned To", type: "string", required: false },
]);

// create a particular contact by name
const perform = (async (z, bundle) => {
  const { contactId, taskId, ...body } = bundle.inputData;
  const response = await z.request({
    method: "PUT",
    url: `${ENV.API_URL}/contacts/${contactId}/tasks/${taskId}`,
    body,
  });
  // this should return a single object
  return response.data;
}) satisfies CreatePerform<InferInputData<typeof inputFields>>;

export default defineCreate({
  key: "updateTask",
  noun: "Update Task",

  display: {
    label: "Update Task",
    description: "Updates an existing task",
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
