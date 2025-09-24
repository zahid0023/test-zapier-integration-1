import {
  defineInputFields,
  defineCreate,
  type CreatePerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";

const inputFields = defineInputFields([
  { key: "locationId", label: "Location ID", type: "string", required: true },
  { key: "name", label: "Name", type: "string", required: true },
  { key: "phone ", label: "Phone", type: "string" },
  { key: "company_id", label: "Company ID", type: "string", required: true },
  { key: "address", label: "Address", type: "string" },
  { key: "city", label: "City", type: "string" },
  { key: "state", label: "State", type: "string" },
  { key: "country", label: "Country", type: "string" },
  { key: "postal_code", label: "Postal Code", type: "string" },
  { key: "website", label: "Website", type: "string" },
  { key: "timezone", label: "Timezone", type: "string" },
  // Prospect Info
  { key: "prospect_info[firstName]", label: "Prospect First Name", type: "string" },
  { key: "prospect_info[lastName]", label: "Prospect Last Name", type: "string" },
  { key: "prospect_info[email]", label: "Prospect Email", type: "string" },
  // Settings
  { key: "settings.allowDuplicateContact", label: "Allow Duplicate Contact", type: "boolean" },
  {
    key: "settings.allowDuplicateOpportunity",
    label: "Allow Duplicate Opportunity",
    type: "boolean",
  },
  { key: "settings.allowFacebookNameMerge", label: "Allow Facebook Name Merge", type: "boolean" },
  { key: "settings.disableContactTimezone", label: "Disable Contact Timezone", type: "boolean" },
  { key: "social.facebookUrl", label: "Facebook URL", type: "string" },
  { key: "social.googlePlus", label: "Google Plus", type: "string" },
  { key: "social.linkedIn", label: "LinkedIn", type: "string" },
  { key: "social.foursquare", label: "Foursquare", type: "string" },
  { key: "social.twitter", label: "Twitter", type: "string" },
  { key: "social.yelp", label: "Yelp", type: "string" },
  { key: "social.instagram", label: "Instagram", type: "string" },
  { key: "social.youtube", label: "YouTube", type: "string" },
  { key: "social.pinterest", label: "Pinterest", type: "string" },
  { key: "social.blogRss", label: "Blog RSS", type: "string" },
  { key: "social.googlePlacesId", label: "Google Places ID", type: "string" },
  { key: "twilio.sid", label: "Twilio SID", type: "string" },
  // { key: "twilio.authToken", label: "Twilio Auth Token", type: "string" },  TODO: getting error for this field
  // { key: "mailgun.apiKey", label: "Mailgun API Key", type: "string" },  TODO: getting error for this field
  { key: "mailgun.domain", label: "Mailgun Domain", type: "string" },
  { key: "snapshot_id", label: "Snapshot ID", type: "string" },
]);

const perform = (async (z, bundle) => {
  const { locationId, ...body } = bundle.inputData;
  const response = await z.request({
    method: "PUT",
    url: `${ENV.API_URL}/locations/${locationId}`,
    body,
  });
  // this should return a single object
  return response.data;
}) satisfies CreatePerform<InferInputData<typeof inputFields>>;

export const updateLocation = defineCreate({
  key: "updateLocation",
  noun: "Location",

  display: {
    label: "Update Location",
    description: "Updates an existing location",
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
