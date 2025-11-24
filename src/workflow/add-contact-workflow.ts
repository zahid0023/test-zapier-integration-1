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
  {
    key: "workflowId",
    label: "Workflow ID",
    type: "string",
    required: true,
    dynamic: "workflows.id.name",
  },
  {
    key: "date",
    label: "Date Time",
    type: "string",
    placeholder: "2024-10-30",
    helpText: "The value of this field should be in YYYY-MM-DD format",
  },
  {
    key: "time",
    label: "Time",
    type: "string",
    placeholder: "15:30",
    helpText: "The value of this field should be in HH:mm format",
  },
  { key: "time_zone", label: "Timezone", type: "string", choices: Timezone },
]);

const perform = (async (z, bundle) => {
  const { contactId, workflowId, ...body } = bundle.inputData;
  const response = await z.request({
    method: "POST",
    url: `${ENV.API_URL}/workflows/${contactId}/${workflowId}`,
    body,
  });
  // this should return a single object
  return response.data;
}) satisfies CreatePerform<InferInputData<typeof inputFields>>;

export const addContactWorkflow = defineCreate({
  key: "addContactWorkflow",
  noun: "Workflow",

  display: {
    label: "Add Contact to Workflow",
    description: "Add a contact to a workflow",
  },

  operation: {
    perform,
    inputFields,

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
      contactId: ENV.TEST_CONTACT_ID,
      workflowId: ENV.TEST_WORKFLOW_ID,
      date: "2024-10-30",
      time: "15:30",
      time_zone: "America/New_York",
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
