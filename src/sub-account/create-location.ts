import {
  defineInputFields,
  defineCreate,
  type CreatePerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";
import { Timezone } from "../enums/timezone.enum.js";
import { COUNTRY_ENUM } from "../enums/country.enum.js";

const inputFields = defineInputFields([
  { key: "name", label: "Name", type: "string", required: true },
  { key: "phone ", label: "Phone", type: "string" },
  { key: "company_id", label: "Company ID", type: "string", required: true },
  { key: "address", label: "Address", type: "string" },
  { key: "city", label: "City", type: "string" },
  { key: "state", label: "State", type: "string" },
  { key: "country", label: "Country", type: "string", choices: COUNTRY_ENUM },
  { key: "postal_code", label: "Postal Code", type: "string" },
  { key: "website", label: "Website", type: "string" },
  { key: "timezone", label: "Timezone", type: "string", choices: Timezone },
  // Prospect Info
  { key: "prospect_info.first_name", label: "Prospect First Name", type: "string" },
  { key: "prospect_info.last_name", label: "Prospect Last Name", type: "string" },
  { key: "prospect_info.email", label: "Prospect Email", type: "string" },
  // Settings
  { key: "settings.allow_duplicate_contact", label: "Allow Duplicate Contact", type: "boolean" },
  {
    key: "settings.allow_duplicate_opportunity",
    label: "Allow Duplicate Opportunity",
    type: "boolean",
  },
  {
    key: "settings.allow_facebook_name_merge",
    label: "Allow Facebook Name Merge",
    type: "boolean",
  },
  { key: "settings.disable_contact_timezone", label: "Disable Contact Timezone", type: "boolean" },
  { key: "social.facebook_url", label: "Facebook URL", type: "string" },
  { key: "social.google_plus", label: "Google Plus", type: "string" },
  { key: "social.linked_in", label: "LinkedIn", type: "string" },
  { key: "social.foursquare", label: "Foursquare", type: "string" },
  { key: "social.twitter", label: "Twitter", type: "string" },
  { key: "social.yelp", label: "Yelp", type: "string" },
  { key: "social.instagram", label: "Instagram", type: "string" },
  { key: "social.youtube", label: "YouTube", type: "string" },
  { key: "social.pinterest", label: "Pinterest", type: "string" },
  { key: "social.blog_rss", label: "Blog RSS", type: "string" },
  { key: "social.google_places_id", label: "Google Places ID", type: "string" },
  { key: "twilio.sid", label: "Twilio SID", type: "string" },
  // { key: "twilio.auth_token", label: "Twilio Auth Token", type: "string" },
  // { key: "mailgun.api_key", label: "Mailgun API Key", type: "string" },
  { key: "mailgun.domain", label: "Mailgun Domain", type: "string" },
  { key: "snapshot_id", label: "Snapshot ID", type: "string" },
]);

const perform = (async (z, bundle) => {
  const response = await z.request({
    method: "POST",
    url: `${ENV.API_URL}/locations`,
    body: bundle.inputData,
  });
  // this should return a single object
  return response.data;
}) satisfies CreatePerform<InferInputData<typeof inputFields>>;

export const createLocation = defineCreate({
  key: "createLocation",
  noun: "Location",

  display: {
    label: "Create Location",
    description: "Creates a new location",
  },

  operation: {
    perform,
    inputFields,

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
      name: "Sample Location",
      company_id: ENV.TEST_COMPANY_ID,
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
