import {
  defineInputFields,
  defineSearch,
  type SearchPerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";

const inputFields = defineInputFields([
  { key: "calendarId", label: "Calendar ID", type: "string" },
  { key: "groupId", label: "Group ID", type: "string" },
  { key: "userId", label: "User ID", type: "string" },
  { key: "locationId", label: "Location ID", type: "string", required: true },
  { key: "timezone", label: "Timezone", type: "string", required: true },
  { key: "startDate", label: "Start Date", type: "string", required: true },
  { key: "startTime", label: "Start Time", type: "string", required: true },
  { key: "endDate", label: "End Date", type: "string", required: true },
  { key: "endTime", label: "End Time", type: "string", required: true },
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
    url: `${ENV.API_URL}/calendars/events/block-slots?calendar-id?calendar-id=${calendarId}&group-id=${groupId}&user-id=${userId}&location-id=${locationId}&timezone=${timezone}&start-date=${startDate}&start-time=${startTime}&end-date=${endDate}&end-time=${endTime}`,
  });
  // this should return an array of objects (but only the first will be used)
  return [response.data.events];
}) satisfies SearchPerform<InferInputData<typeof inputFields>>;

export const getBlockSlots = defineSearch({
  key: "getBlockSlots",
  noun: "Block Slot",

  display: {
    label: "Get All Block Slots",
    description: "Get all block slots for calendar event",
  },

  operation: {
    perform,

    // `inputFields` defines the fields a user could provide
    // Zapier will pass them in as `bundle.inputData` later. Searches need at least one `inputField`.
    inputFields,

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    // sample: {
    //   id: 1,
    //   name: "Test",
    // },

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
