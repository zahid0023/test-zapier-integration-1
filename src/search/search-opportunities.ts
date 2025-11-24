import {
  defineInputFields,
  defineSearch,
  type SearchPerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";
import { COUNTRY_ENUM } from "../enums/country.enum.js";
import { OPPORTUNITY_STATUS } from "../enums/opportunity.enum.js";

const inputFields = defineInputFields([
  { key: "q", label: "Search Query", type: "string" },
  { key: "pipelineId", label: "Pipeline ID", type: "string" },
  { key: "pipelineStageId", label: "Pipeline Stage ID", type: "string" },
  { key: "contactId", label: "Contact ID", type: "string" },
  { key: "status", label: "Status", type: "string", choices: OPPORTUNITY_STATUS },
  { key: "assignedTo", label: "Assigned To", type: "string" },
  { key: "campaignId", label: "Campaign ID", type: "string" },
  { key: "opportunityId", label: "Opportunity ID", type: "string" },
  { key: "order", label: "Order", type: "string", placeholder: "added_asc" },
  { key: "endDate", label: "End Date", type: "string", placeholder: "mm-dd-yyyy" },
  { key: "startAfter", label: "Start After", type: "string" },
  { key: "startAfterId", label: "Start After ID", type: "string" },
  { key: "startDate", label: "Start Date", type: "string", placeholder: "mm-dd-yyyy" },
  { key: "country", label: "Country", type: "string", choices: COUNTRY_ENUM },
  { key: "page", label: "Page", type: "integer", default: "1" },
  {
    key: "limit",
    label: "Limit",
    type: "integer",
    default: "20",
    helpText: "Limit Per Page records count. will allow maximum up to 100 and default will be 20",
  },
  { key: "getTasks", label: "Get Tasks", type: "boolean", helpText: "get Tasks in contact" },
  { key: "getNotes", label: "Get Notes", type: "boolean", helpText: "get Notes in contact" },
  {
    key: "getCalendarEvents",
    label: "Get Calendar Events",
    type: "boolean",
    helpText: "get Calender event in contact",
  },
]);

const perform = (async (z, bundle) => {
  const {
    q,
    pipelineId,
    pipelineStageId,
    contactId,
    status,
    assignedTo,
    campaignId,
    opportunityId,
    order,
    endDate,
    startAfter,
    startAfterId,
    startDate,
    country,
    page,
    limit,
    getTasks,
    getNotes,
    getCalendarEvents,
  } = bundle.inputData;
  const query = `${q ? `q=${q}&` : ""}${pipelineId ? `pipeline-id=${pipelineId}&` : ""}${
    pipelineStageId ? `pipeline-stage-id=${pipelineStageId}&` : ""
  }${contactId ? `contact-id=${contactId}&` : ""}${status ? `status=${status}&` : ""}${
    assignedTo ? `assigned-to=${assignedTo}&` : ""
  }${campaignId ? `campaign-id=${campaignId}&` : ""}${
    opportunityId ? `opportunity-id=${opportunityId}&` : ""
  }${order ? `order=${order}&` : ""}${endDate ? `end-date=${endDate}&` : ""}${
    startAfter ? `start-after=${startAfter}&` : ""
  }${startAfterId ? `start-after-id=${startAfterId}&` : ""}${
    startDate ? `start-date=${startDate}&` : ""
  }${country ? `country=${country}&` : ""}${page ? `page=${page}&` : ""}${
    limit ? `limit=${limit}&` : ""
  }${getTasks ? `get-tasks=${getTasks}&` : ""}${getNotes ? `get-notes=${getNotes}&` : ""}${
    getCalendarEvents ? `get-calendar-events=${getCalendarEvents}&` : ""
  }`;

  const response = await z.request({
    url: `${ENV.API_URL}/opportunities/search?${query}`,
  });
  // this should return an array of objects (but only the first will be used)
  return [response.data];
}) satisfies SearchPerform<InferInputData<typeof inputFields>>;

export const searchOpportunity = defineSearch({
  key: "searchOpportunity",
  noun: "Opportunity",

  display: {
    label: "Search Opportunity",
    description: "Search opportunities",
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
