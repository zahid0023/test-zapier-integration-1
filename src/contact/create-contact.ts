import {
  defineInputFields,
  defineCreate,
  type CreatePerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";
import { COUNTRY_ENUM } from "../enums/country.enum.js";
import { DND_STATUS_ENUM, GENDER_ENUM, INBOUND_DND_STATUS_ENUM } from "../enums/contact.enum.js";

const inputFields = defineInputFields([
  { key: "first_name", label: "First Name", type: "string", required: false },
  { key: "last_name", label: "Last Name", type: "string", required: false },
  { key: "name", label: "Full Name", type: "string", required: false },
  { key: "email", label: "Email", type: "string", required: false },
  { key: "location_id", label: "Location ID", type: "string", required: true },
  { key: "gender", label: "Gender", type: "string", choices: GENDER_ENUM },
  { key: "phone", label: "Phone", type: "string", required: false },
  { key: "address1", label: "Address Line 1", type: "string" },
  { key: "city", label: "City", type: "string" },
  { key: "state", label: "State", type: "string" },
  { key: "postal_code", label: "Postal Code", type: "string" },
  { key: "website", label: "Website", type: "string" },
  { key: "timezone", label: "Timezone", type: "string" },
  { key: "dnd", label: "Do Not Disturb", type: "boolean" },
  {
    key: "dnd_settings.call.status",
    label: "DND Call Status",
    type: "string",
    choices: DND_STATUS_ENUM,
  },
  {
    key: "dnd_settings.call.message",
    label: "DND Call Message",
    type: "string",
  },
  { key: "dnd_settings.call.code", label: "DND Call Code", type: "string" },
  {
    key: "dnd_settings.email.status",
    label: "DND Email Status",
    type: "string",
    choices: DND_STATUS_ENUM,
  },
  {
    key: "dnd_settings.email.message",
    label: "DND Email Message",
    type: "string",
  },
  { key: "dnd_settings.email.code", label: "DND Email Code", type: "string" },
  {
    key: "dnd_settings.sms.status",
    label: "DND SMS Status",
    type: "string",
    choices: DND_STATUS_ENUM,
  },
  { key: "dnd_settings.sms.message", label: "DND SMS Message", type: "string" },
  { key: "dnd_settings.sms.code", label: "DND SMS Code", type: "string" },
  {
    key: "dnd_settings.whats_app.status",
    label: "DND WhatsApp Status",
    type: "string",
    choices: DND_STATUS_ENUM,
  },
  {
    key: "dnd_settings.whats_app.message",
    label: "DND WhatsApp Message",
    type: "string",
  },
  {
    key: "dnd_settings.whats_app.code",
    label: "DND WhatsApp Code",
    type: "string",
  },
  {
    key: "dnd_settings.gmb.status",
    label: "DND GMB Status",
    type: "string",
    choices: DND_STATUS_ENUM,
  },
  { key: "dnd_settings.gmb.message", label: "DND GMB Message", type: "string" },
  { key: "dnd_settings.gmb.code", label: "DND GMB Code", type: "string" },
  {
    key: "dnd_settings.fb.status",
    label: "DND Facebook Status",
    type: "string",
    choices: DND_STATUS_ENUM,
  },
  {
    key: "dnd_settings.fb.message",
    label: "DND Facebook Message",
    type: "string",
  },
  { key: "dnd_settings.fb.code", label: "DND Facebook Code", type: "string" },
  {
    key: "inbound_dnd_settings.all.status",
    label: "Inbound DND (All) Status",
    type: "string",
    choices: INBOUND_DND_STATUS_ENUM,
  },
  {
    key: "inbound_dnd_settings.all.message",
    label: "Inbound DND (All) Message",
    type: "string",
  },
  { key: "tags", label: "Tags", type: "string", list: true },
  {
    key: "custom_fields",
    label: "Custom Fields",
    children: [
      { key: "id", label: "ID", type: "string" },
      { key: "key", label: "Key", type: "string" },
      { key: "field_value", label: "Field Value", type: "string" },
    ],
  },
  // {
  //   key: "custom_fields.id",
  //   label: "Custom Field ID",
  //   type: "string",
  // },
  // {
  //   key: "custom_fields.key",
  //   label: "Custom Field Key",
  //   type: "string",
  // },
  // {
  //   key: "custom_fields.field_value",
  //   label: "Custom Field Value",
  //   type: "string",
  // },
  { key: "source", label: "Source", type: "string" },
  { key: "country", label: "Country", type: "string", choices: COUNTRY_ENUM },
  { key: "company_name", label: "Company Name", type: "string" },
  { key: "assigned_to", label: "Assigned To", type: "string" },
]);

export const sampleInputData = {
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  location_id: "IxfSlEIQQeiOYQlVEApa",
  gender: "male",
  phone: "555-555-5555",
  address1: "123 Main St",
  city: "Anytown",
  state: "CA",
  postal_code: "12345",
  website: "https://example.com",
  timezone: "America/Los_Angeles",
  dnd: false,
  dnd_settings: {
    call: {
      status: "active",
      message: "I'm busy right now",
      code: "BUSY",
    },
    email: {
      status: "inactive",
      message: "No email notifications",
      code: "NO_EMAIL",
    },
    sms: {
      status: "inactive",
      message: "No SMS notifications",
      code: "NO_SMS",
    },
    whats_app: {
      status: "inactive",
      message: "No WhatsApp notifications",
      code: "NO_WHATSAPP",
    },
    gmb: {
      status: "inactive",
      message: "No GMB notifications",
      code: "NO_GMB",
    },
    fb: {
      status: "inactive",
      message: "No Facebook notifications",
      code: "NO_FB",
    },
  },
  inbound_dnd_settings: {
    all: {
      status: "inactive",
      message: "No inbound DND",
    },
  },
  tags: ["customer", "lead"],
  custom_fields: [
    { id: "1", key: "favorite_color", field_value: "blue" },
    { id: "2", key: "hobby", field_value: "guitar" },
  ],
  source: "web",
  country: "USA",
  company_name: "Example Inc.",
  assigned_to: "user_123",
};

// create a particular contact by name
const perform = (async (z, bundle) => {
  const response = await z.request({
    method: "POST",
    url: `${ENV.API_URL}/contacts`,
    body: bundle.inputData,
  });
  // this should return a single object
  return response.data;
}) satisfies CreatePerform<InferInputData<typeof inputFields>>;

export const createContact = defineCreate({
  key: "createContact",
  noun: "Contact",

  display: {
    label: "Create Contact",
    description: "Creates a new contact, probably with input from previous steps.",
  },

  operation: {
    perform,

    // `inputFields` defines the fields a user could provide
    // Zapier will pass them in as `bundle.inputData` later. They're optional.
    // End-users will map data into these fields. In general, they should have any fields that the API can accept. Be sure to accurately mark which fields are required!
    inputFields,

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
      location_id: ENV.LOCATION_ID,
      email: `user${Math.floor(Math.random() * 10000)}@example.com`,
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
