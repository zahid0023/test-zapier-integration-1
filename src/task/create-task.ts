import {
  defineInputFields,
  defineCreate,
  type CreatePerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";
import { Timezone } from "../enums/timezone.enum.js";

const inputFields = defineInputFields([
  { key: "contactId", label: "Contact ID", type: "string", required: true },
  { key: "title", label: "Title", type: "string", required: true },
  { key: "body", label: "Body", type: "string" },
  {
    key: "due_date",
    label: "Due Date",
    type: "string",
    placeholder: "2024-12-31",
    helpText: "The value of this field should be in YYYY-MM-DD format",
    required: true,
  },
  {
    key: "due_time",
    label: "Due Time",
    type: "string",
    placeholder: "17:00:30",
    helpText: "The value of this field should be in HH:mm or HH:mm:ss format",
    required: true,
  },
  { key: "time_zone", label: "Time Zone", type: "string", choices: Timezone, required: true },
  { key: "completed", label: "Completed", type: "boolean", required: true },
  {
    key: "assigned_to",
    label: "Assigned To",
    type: "string",
    required: false,
    helpText: "Get the assigned ID from the 'Get All Users' action",
  },
]);

const perform = (async (z, bundle) => {
  const { contactId, ...body } = bundle.inputData;
  const response = await z.request({
    method: "POST",
    url: `${ENV.API_URL}/contacts/${contactId}/tasks`,
    body,
  });
  // this should return a single object
  return response.data;
}) satisfies CreatePerform<InferInputData<typeof inputFields>>;

export const createTask = defineCreate({
  key: "createTask",
  noun: "Task",

  display: {
    label: "Create Task",
    description: "Creates a new task",
  },

  operation: {
    perform,
    inputFields,

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
      contactId: ENV.TEST_CONTACT_ID,
      title: "Test Task 1",
      due_date: "2024-12-31",
      due_time: "17:00",
      time_zone: "America/New_York",
      completed: false,
    } satisfies InferInputData<typeof inputFields>,

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
