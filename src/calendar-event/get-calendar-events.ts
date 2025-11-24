import {
  defineInputFields,
  defineSearch,
  type SearchPerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";
import { Timezone } from "../enums/timezone.enum.js";

const inputFields = defineInputFields([
  {
    key: "calendarId",
    label: "Calendar ID",
    type: "string",
    helpText: "Get the Calendar ID from the 'Get All Calendars' action.",
  },
  {
    key: "groupId",
    label: "Group ID",
    type: "string",
    helpText: "Get the Group ID from the 'Get All Calendar Groups' action.",
  },
  {
    key: "userId",
    label: "User ID",
    type: "string",
    helpText: "Get the User ID from the 'Get All Users' action.",
  },
  { key: "locationId", label: "Location ID", type: "string", required: true },
  {
    key: "timezone",
    label: "Timezone",
    type: "string",
    default: Timezone["America/New_York"],
    choices: Timezone,
  },
  {
    key: "startDate",
    label: "Start Date",
    type: "string",
    required: true,
    placeholder: "YYYY-MM-DD",
    helpText: "The value of this field should be in YYYY-MM-DD format",
  },
  {
    key: "startTime",
    label: "Start Time",
    type: "string",
    required: true,
    placeholder: "HH:mm or HH:mm:ss",
    helpText: "The value of this field should be in HH:mm or HH:mm:ss format",
  },
  {
    key: "endDate",
    label: "End Date",
    type: "string",
    required: true,
    placeholder: "YYYY-MM-DD",
    helpText: "The value of this field should be in YYYY-MM-DD format",
  },
  {
    key: "endTime",
    label: "End Time",
    type: "string",
    required: true,
    placeholder: "HH:mm or HH:mm:ss",
    helpText: "The value of this field should be in HH:mm or HH:mm:ss format",
  },
]);

const perform = (async (z, bundle) => {
  const {
    calendarId = "",
    groupId = "",
    userId = "",
    locationId = "",
    timezone = "",
    startDate = "",
    startTime = "",
    endDate = "",
    endTime = "",
  } = bundle.inputData;
  const response = await z.request({
    url: `${
      ENV.API_URL
    }/calendars/events/events?location-id=${locationId}&timezone=${timezone}&start-date=${startDate}&start-time=${startTime}&end-date=${endDate}&end-time=${endTime}${
      calendarId ? `&calendar-id=${calendarId}` : ""
    }${groupId ? `&group-id=${groupId}` : ""}${userId ? `&user-id=${userId}` : ""}`,
  });
  // this should return an array of objects (but only the first will be used)
  return [response.data];
}) satisfies SearchPerform<InferInputData<typeof inputFields>>;

export const getCalendarEvents = defineSearch({
  key: "getCalendarEvents",
  noun: "Calendar Event",

  display: {
    label: "Search Appointment Event",
    description: "Get Appointment Events by Calendar",
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
      locationId: ENV.LOCATION_ID,
      timezone: "America/New_York",
      startDate: "2024-10-01",
      startTime: "08:00",
      endDate: "2024-10-31",
      endTime: "18:00",
    } satisfies InferInputData<typeof inputFields>,

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
