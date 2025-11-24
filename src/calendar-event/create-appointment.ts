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
  { key: "meeting_location_type", label: "Meeting Location Type", type: "string" },
  { key: "meeting_location_id", label: "Meeting Location ID", type: "string" },
  {
    key: "override_location_config",
    label: "Override Location Config",
    type: "boolean",
    required: false,
  },
  { key: "appointment_status", label: "Appointment Status", type: "string" },
  { key: "assigned_user_id", label: "Assigned User ID", type: "string" },
  { key: "address", label: "Address", type: "string" },
  { key: "ignore_date_range", label: "Ignore Date Range", type: "boolean" },
  { key: "to_notify", label: "To Notify", type: "boolean" },
  {
    key: "ignore_free_slot_validation",
    label: "Ignore Free Slot Validation",
    type: "boolean",
  },
  { key: "rrule", label: "Rrule", type: "string" },
  { key: "calendar_id", label: "Calendar ID", type: "string", required: true },
  { key: "contact_id", label: "Contact ID", type: "string", required: true },
  {
    key: "start_date",
    label: "Start Date",
    type: "string",
    required: true,
    placeholder: "YYYY-MM-DD",
    helpText: "The value of this field should be in YYYY-MM-DD format",
  },
  {
    key: "start_time",
    label: "Start Time",
    type: "string",
    required: true,
    placeholder: "HH:mm or HH:mm:ss",
    helpText: "The value of this field should be in HH:mm or HH:mm:ss format",
  },
  {
    key: "end_date",
    label: "End Date",
    type: "string",
    placeholder: "YYYY-MM-DD",
    helpText: "The value of this field should be in YYYY-MM-DD format",
  },
  {
    key: "end_time",
    label: "End Time",
    type: "string",
    placeholder: "HH:mm or HH:mm:ss",
    helpText: "The value of this field should be in HH:mm or HH:mm:ss format",
  },
  { key: "time_zone", label: "Time Zone", type: "string", required: true, choices: Timezone },
]);

const perform = (async (z, bundle) => {
  const response = await z.request({
    method: "POST",
    url: `${ENV.API_URL}/calendars/events/appointments`,
    body: bundle.inputData,
  });
  // this should return a single object
  return response.data;
}) satisfies CreatePerform<InferInputData<typeof inputFields>>;

export const createAppointmentEvent = defineCreate({
  key: "createAppointmentEvent",
  noun: "Calendar Event Appointment",

  display: {
    label: "Create Appointment Event",
    description: "Creates a new appointment event",
  },

  operation: {
    perform,
    inputFields,

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
      title: "New Appointment 1",
      calendar_id: ENV.TEST_CALENDAR_ID,
      contact_id: ENV.TEST_CONTACT_ID,
      start_date: "2024-11-01",
      start_time: "10:00",
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
