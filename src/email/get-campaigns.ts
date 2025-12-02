import {
  defineInputFields,
  defineSearch,
  type SearchPerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";
import { EMAIL_DELIVERY_STATUS_ENUM, EMAIL_SCHEDULE_STATUS_ENUM } from "../enums/email.enum.js";

const inputFields = defineInputFields([
  {
    key: "limit",
    label: "Limit",
    type: "integer",
    helpText: "Maximum number of campaigns to return. Defaults to 10, maximum is 100",
  },
  {
    key: "offset",
    label: "Offset",
    type: "integer",
    helpText: "Number of campaigns to skip for pagination",
  },
  {
    key: "status",
    label: "Status",
    type: "string",
    default: EMAIL_SCHEDULE_STATUS_ENUM.active,
    choices: EMAIL_SCHEDULE_STATUS_ENUM,
  },
  {
    key: "emailStatus",
    label: "Email Status",
    type: "string",
    default: EMAIL_DELIVERY_STATUS_ENUM.complete,
    choices: EMAIL_DELIVERY_STATUS_ENUM,
  },
  { key: "name", label: "Name", type: "string", helpText: "Filter campaigns by name" },
  {
    key: "parentId",
    label: "Parent ID",
    type: "string",
    helpText: "Filter campaigns by parent folder ID",
  },
  {
    key: "limitFields",
    label: "Limit Fields",
    type: "boolean",
    helpText:
      "When true, returns only essential campaign fields like id, templateDataDownloadUrl, updatedAt, type, templateType, templateId, downloadUrl and isPlainText. When false, returns complete campaign data including meta information, bulkRequestStatusInfo, ABTestInfo, resendScheduleInfo and all other campaign properties",
  },
  { key: "archived", label: "Archived", type: "boolean", helpText: "Filter archived campaigns" },
  {
    key: "campaignsOnly",
    label: "Campaigns Only",
    type: "boolean",
    helpText: "Return only campaigns, excluding folders",
  },
  {
    key: "showStats",
    label: "Show Stats",
    type: "boolean",
    helpText:
      "When true, returns campaign statistics including delivered count, opened count, clicked count and revenue if available for the campaign. When false, returns campaign data without statistics.",
  },
]);

const perform = (async (z, bundle) => {
  const params = new URLSearchParams();
  for (const key in bundle.inputData) {
    if (bundle.inputData[key] !== undefined) {
      params.append(key, String(bundle.inputData[key]));
    }
  }
  const response = await z.request({
    url: `${ENV.API_URL}/emails/schedule`,
    params: Object.fromEntries(params),
  });
  // this should return an array of objects (but only the first will be used)
  return [response.data];
}) satisfies SearchPerform<InferInputData<typeof inputFields>>;

export const getEmailCampaigns = defineSearch({
  key: "getEmailCampaigns",
  noun: "Email(Campaign)",

  display: {
    label: "Get All Email Campaigns",
    description: "Get all email campaigns",
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
