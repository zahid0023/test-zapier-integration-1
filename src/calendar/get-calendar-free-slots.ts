import {
  defineInputFields,
  defineSearch,
  type SearchPerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";

const inputFields = defineInputFields([
  { key: "calendarId", label: "Calendar ID", type: "string", required: true },
  { key: "timezone", label: "Time Zone", type: "string" },
  {
    key: "userId",
    label: "User ID",
    type: "string",
    helpText: "Get the User ID from the 'Get All Users' action.",
  },
  {
    key: "startDate",
    label: "Start Date",
    type: "string",
    required: true,
    placeholder: "2024-12-31",
  },
  {
    key: "startTime",
    label: "Start Time",
    type: "string",
    required: true,
    placeholder: "09:00:00",
  },
  { key: "endDate", label: "End Date", type: "string", required: true, placeholder: "2024-12-31" },
  { key: "endTime", label: "End Time", type: "string", required: true, placeholder: "17:00:00" },
]);

const perform = (async (z, bundle) => {
  const response = await z.request({
    url: `${ENV.API_URL}/calendars/${bundle.inputData.calendarId}/free-slots?start-date=${
      bundle.inputData.startDate
    }&start-time=${bundle.inputData.startTime}&end-date=${bundle.inputData.endDate}&end-time=${
      bundle.inputData.endTime
    }${bundle.inputData.timezone ? `&time-zone=${bundle.inputData.timezone}` : ""}${
      bundle.inputData.userId ? `&user-id=${bundle.inputData.userId}` : ""
    }`,
  });
  // this should return an array of objects (but only the first will be used)
  return [response.data];
}) satisfies SearchPerform<InferInputData<typeof inputFields>>;

export const getCalendarFreeSlots = defineSearch({
  key: "getCalendarFreeSlots",
  noun: "Calendar Free Slot",

  display: {
    label: "Get Calendar Free Slots",
    description: "Get free slots for a specific Calendar by ID",
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
