import {
  defineInputFields,
  defineCreate,
  type CreatePerform,
  type InferInputData,
} from 'zapier-platform-core';

const inputFields = defineInputFields([
  { key: "first_name", required: false, type: "string", label: "First Name" },
  { key: "last_name", required: false, type: "string", label: "Last Name" },
  { key: "name", required: false, type: "string", label: "Full Name" },
  { key: "email", required: false, type: "string", label: "Email Address" },
  { key: "location_id", required: true, type: "string", label: "Location ID" },
  { key: "gender", required: false, type: "string", label: "Gender" },
  { key: "phone", required: false, type: "string", label: "Phone Number" },
  { key: "address1", required: false, type: "string", label: "Address Line 1" },
  { key: "city", required: false, type: "string", label: "City" },
  { key: "state", required: false, type: "string", label: "State" },
  { key: "postal_code", required: false, type: "string", label: "Postal Code" },
  { key: "website", required: false, type: "string", label: "Website" },
  { key: "timezone", required: false, type: "string", label: "Timezone" },
  { key: "dnd", required: false, type: "boolean", label: "Do Not Disturb" },

  // DND Settings (nested objects – flatten keys)
  { key: "dnd_settings.call.status", required: false, type: "string", label: "DND - Call Status" },
  { key: "dnd_settings.call.message", required: false, type: "string", label: "DND - Call Message" },
  { key: "dnd_settings.call.code", required: false, type: "string", label: "DND - Call Code" },

  { key: "dnd_settings.email.status", required: false, type: "string", label: "DND - Email Status" },
  { key: "dnd_settings.email.message", required: false, type: "string", label: "DND - Email Message" },
  { key: "dnd_settings.email.code", required: false, type: "string", label: "DND - Email Code" },

  { key: "dnd_settings.sms.status", required: false, type: "string", label: "DND - SMS Status" },
  { key: "dnd_settings.sms.message", required: false, type: "string", label: "DND - SMS Message" },
  { key: "dnd_settings.sms.code", required: false, type: "string", label: "DND - SMS Code" },


  { key: "dnd_settings.whats_app.status", required: false, type: "string", label: "DND - WhatsApp Status" },
  { key: "dnd_settings.whats_app.message", required: false, type: "string", label: "DND - WhatsApp Message" },
  { key: "dnd_settings.whats_app.code", required: false, type: "string", label: "DND - WhatsApp Code" },

  { key: "dnd_settings.gmb.status", required: false, type: "string", label: "DND - GMB Status" },
  { key: "dnd_settings.gmb.message", required: false, type: "string", label: "DND - GMB Message" },
  { key: "dnd_settings.gmb.code", required: false, type: "string", label: "DND - GMB Code" },

  { key: "dnd_settings.fb.status", required: false, type: "string", label: "DND - Facebook Status" },
  { key: "dnd_settings.fb.message", required: false, type: "string", label: "DND - Facebook Message" },
  { key: "dnd_settings.fb.code", required: false, type: "string", label: "DND - Facebook Code" },

  // Inbound DND Settings
  { key: "inbound_dnd_settings.all.status", required: false, type: "string", label: "Inbound DND - All Status" },
  { key: "inbound_dnd_settings.all.message", required: false, type: "string", label: "Inbound DND - All Message" },

  // Tags
  { key: "tags[]", required: false, type: "string", label: "Tags (comma separated)" },

  // Custom Fields
  { key: "custom_fields[].id", required: false, type: "string", label: "Custom Field ID" },
  { key: "custom_fields[].key", required: false, type: "string", label: "Custom Field Key" },
  { key: "custom_fields[].field_value", required: false, type: "string", label: "Custom Field Value" },

  { key: "source", required: false, type: "string", label: "Source" },
  { key: "country", required: false, type: "string", label: "Country" },
  { key: "company_name", required: false, type: "string", label: "Company Name" },
  { key: "assigned_to", required: false, type: "string", label: "Assigned To" }
]);

// create a particular contact by name
const perform = (async (z, bundle) => {
  const response = await z.request({
    method: 'POST',
    url: 'http://34.227.215.210:8080/api/v1/contacts',
    // if `body` is an object, it'll automatically get run through JSON.stringify
    // if you don't want to send JSON, pass a string in your chosen format here instead
    json: bundle.inputData,
  });
  
  // this should return a single object
  return response.data;
}) satisfies CreatePerform<InferInputData<typeof inputFields>>;

export default defineCreate({
  // see here for a full list of available properties:
  // https://github.com/zapier/zapier-platform/blob/main/packages/schema/docs/build/schema.md#createschema
  key: 'contact',
  noun: 'Contact',

  display: {
    label: 'Create Contact',
    description: 'Creates a new contact, probably with input from previous steps.'
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
      id: 1,
      name: 'Test',
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
