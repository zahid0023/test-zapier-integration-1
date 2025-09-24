import {
  defineInputFields,
  defineCreate,
  type CreatePerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";

const inputFields = defineInputFields([
  { key: "appointmentId", label: "Appointment ID", type: "string", required: true },
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
  { key: "start_time", label: "Start Time", type: "string", required: true },
  { key: "end_time", label: "End Time", type: "string" },
]);

const perform = (async (z, bundle) => {
  const { appointmentId, ...body } = bundle.inputData;
  const response = await z.request({
    method: "PUT",
    url: `${ENV.API_URL}/calendars/events/appointments/${appointmentId}`,
    body,
  });
  // this should return a single object
  return response.data;
}) satisfies CreatePerform<InferInputData<typeof inputFields>>;

export const updateAppointmentEvent = defineCreate({
  key: "updateAppointmentEvent",
  noun: "Calendar Event Appointment",

  display: {
    label: "Update Appointment Event",
    description: "Updates an existing appointment event",
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
