import {
  defineInputFields,
  defineCreate,
  type CreatePerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";
import {
  CUSTOM_MENU_FONT_FAMILY_ENUM,
  CUSTOM_MENU_OPEN_MODE_ENUM,
  CUSTOM_MENU_USER_ROLE_ENUM,
} from "../enums/custom-menu-link.enum.js";

const inputFields = defineInputFields([
  {
    key: "customMenuLinkId",
    label: "Custom Menu Link ID",
    type: "string",
    required: true,
    helpText: "Get the ID from `Get All Custom Menu Links` action.",
  },
  { key: "title", label: "Title", type: "string" },
  { key: "url", label: "URL", type: "string" },
  { key: "icon.name", label: "Icon Name", type: "string" },
  {
    key: "icon.fontFamily",
    label: "Icon Font Family",
    type: "string",
    choices: CUSTOM_MENU_FONT_FAMILY_ENUM,
  },
  {
    key: "show_on_company",
    label: "Show on Company",
    type: "boolean",
    default: "true",
    helpText: "Whether the menu must be displayed on the agency's level",
  },
  {
    key: "show_on_location",
    label: "Show on Location",
    type: "boolean",
    default: "true",
    helpText: "Whether the menu must be displayed for sub-accounts level",
  },
  {
    key: "show_to_all_locations",
    label: "Show to All Locations",
    type: "boolean",
    default: "true",
    helpText: "Whether the menu must be displayed to all sub-accounts",
  },
  {
    key: "open_mode",
    label: "Open Mode",
    type: "string",
    choices: CUSTOM_MENU_OPEN_MODE_ENUM,
  },
  {
    key: "locations",
    label: "Locations",
    type: "string",
    list: true,
    helpText:
      "List of sub-account IDs where the menu should be shown. This list is applicable only when showOnLocation is true and showToAllLocations is false",
  },
  {
    key: "user_role",
    label: "User Role",
    type: "text",
    choices: CUSTOM_MENU_USER_ROLE_ENUM,
  },
  {
    key: "allow_camera",
    label: "Allow Camera",
    type: "boolean",
    helpText: "Whether to allow camera access (only for iframe mode)",
  },
  {
    key: "allow_microphone",
    label: "Allow Microphone",
    type: "boolean",
    helpText: "Whether to allow microphone access (only for iframe mode)",
  },
]);

// create a particular calendar by name
const perform = (async (z, bundle) => {
  const { customMenuLinkId, ...body } = bundle.inputData;
  const response = await z.request({
    method: "PUT",
    url: `${ENV.API_URL}/custom-menu-links/${customMenuLinkId}`,
    body,
  });
  // this should return a single object
  return response.data;
}) satisfies CreatePerform<InferInputData<typeof inputFields>>;

export const updateCustomMenuLink = defineCreate({
  key: "updateCustomMenuLink",
  noun: "Custom Menu Link",

  display: {
    label: "Update Custom Menu Link",
    description: "Updates an existing custom menu link",
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
