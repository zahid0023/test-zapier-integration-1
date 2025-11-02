import {
  defineInputFields,
  defineCreate,
  type CreatePerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";
import { Timezone } from "../enums/timezone.enum.js";

const inputFields = defineInputFields([
  { key: "title", label: "Title", type: "string" },
  { key: "calendar_id", label: "Calendar ID", type: "string", required: true },
  { key: "assigned_user_id", label: "Assigned User ID", type: "string" },
  { key: "location_id", label: "Location ID", type: "string", required: true },
  { key: "time_zone", label: "Time Zone", type: "string", choices: Timezone },
  {
    key: "start_date",
    label: "Start Date",
    type: "string",
    placeholder: "2024-12-31",
    helpText: "The value of this field should be in YYYY-MM-DD format",
  },
  {
    key: "start_time",
    label: "Start Time",
    type: "string",
    placeholder: "09:00:00",
    helpText: "The value of this field should be in HH:MM:SS format",
  },
  {
    key: "end_date",
    label: "End Date",
    type: "string",
    placeholder: "2024-12-31",
    helpText: "The value of this field should be in YYYY-MM-DD format",
  },
  {
    key: "end_time",
    label: "End Time",
    type: "string",
    placeholder: "17:00:00",
    helpText: "The value of this field should be in HH:MM:SS format",
  },
]);

const perform = (async (z, bundle) => {
  const response = await z.request({
    method: "POST",
    url: `${ENV.API_URL}/calendars/events/block-slots`,
    body: bundle.inputData,
  });
  // this should return a single object
  return response.data;
}) satisfies CreatePerform<InferInputData<typeof inputFields>>;

export const createCalendarBlockSlot = defineCreate({
  key: "createCalendarBlockSlot",
  noun: "Calendar Event Block Slot",

  display: {
    label: "Create Calendar Block Slot",
    description: "Creates a new calendar block slot",
  },

  operation: {
    perform,
    inputFields,

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
      calendar_id: ENV.TEST_CALENDAR_ID,
      location_id: ENV.LOCATION_ID,
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
