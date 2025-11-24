import {
  defineInputFields,
  defineCreate,
  type CreatePerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";
import { USER_SCOPE } from "../enums/user.enum.js";

const inputFields = defineInputFields([
  {
    key: "userId",
    label: "User ID",
    type: "string",
    required: true,
    helpText: "Get the User ID from the 'Get All Users' action.",
  },
  { key: "contact_id", label: "Contact ID", type: "string" },
  { key: "first_name", label: "First Name", type: "string" },
  { key: "last_name", label: "Last Name", type: "string" },
  { key: "email", label: "Email", type: "string" },
  { key: "email_change_otp", label: "Email Change OTP", type: "string" },
  {
    key: "pass",
    label: "Password",
    type: "password",
    helpText:
      "Password must be more than 8 characters including uppercase, lowercase, numbers and special characters.",
  },
  { key: "phone", label: "Phone", type: "string" },
  { key: "is_ejected_user", label: "Is Ejected User", type: "boolean" },
  {
    key: "type",
    label: "Type",
    type: "string",
    choices: { lead: "Lead", customer: "Customer", vendor: "Vendor" },
  },
  { key: "role", label: "Role", type: "string" },
  { key: "location_ids", label: "Location IDs", type: "string", list: true },
  {
    key: "permissions.campaigns_enabled",
    label: "Campaigns Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.campaigns_read_only",
    label: "Campaigns Read Only",
    type: "boolean",
    default: "false",
  },
  {
    key: "permissions.contacts_enabled",
    label: "Contacts Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.workflows_enabled",
    label: "Workflows Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.workflows_read_only",
    label: "Workflows Read Only",
    type: "boolean",
    default: "false",
  },
  {
    key: "permissions.triggers_enabled",
    label: "Triggers Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.funnels_enabled",
    label: "Funnels Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.websites_enabled",
    label: "Websites Enabled",
    type: "boolean",
    default: "false",
  },
  {
    key: "permissions.opportunities_enabled",
    label: "Opportunities Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.dashboard_stats_enabled",
    label: "Dashboard Stats Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.bulk_requests_enabled",
    label: "Bulk Requests Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.appointments_enabled",
    label: "Appointments Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.reviews_enabled",
    label: "Reviews Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.online_listings_enabled",
    label: "Online Listings Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.phone_call_enabled",
    label: "Phone Call Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.conversations_enabled",
    label: "Conversations Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.assigned_data_only",
    label: "Assigned Data Only",
    type: "boolean",
    default: "false",
  },
  {
    key: "permissions.adwords_reporting_enabled",
    label: "Adwords Reporting Enabled",
    type: "boolean",
    default: "false",
  },
  {
    key: "permissions.membership_enabled",
    label: "Membership Enabled",
    type: "boolean",
    default: "false",
  },
  {
    key: "permissions.facebook_ads_reporting_enabled",
    label: "Facebook Ads Reporting Enabled",
    type: "boolean",
    default: "false",
  },
  {
    key: "permissions.attributions_reporting_enabled",
    label: "Attributions Reporting Enabled",
    type: "boolean",
    default: "false",
  },
  {
    key: "permissions.settings_enabled",
    label: "Settings Enabled",
    type: "boolean",
    default: "true",
  },
  { key: "permissions.tags_enabled", label: "Tags Enabled", type: "boolean", default: "true" },
  {
    key: "permissions.lead_value_enabled",
    label: "Lead Value Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.marketing_enabled",
    label: "Marketing Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.agent_reporting_enabled",
    label: "Agent Reporting Enabled",
    type: "boolean",
    default: "true",
  },
  { key: "permissions.bot_service", label: "Bot Service", type: "boolean", default: "false" },
  { key: "permissions.social_planner", label: "Social Planner", type: "boolean", default: "true" },
  {
    key: "permissions.blogging_enabled",
    label: "Blogging Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.invoice_enabled",
    label: "Invoice Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.affiliate_manager_enabled",
    label: "Affiliate Manager Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.content_ai_enabled",
    label: "Content AI Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.refunds_enabled",
    label: "Refunds Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.record_payment_enabled",
    label: "Record Payment Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.cancel_subscription_enabled",
    label: "Cancel Subscription Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.payments_enabled",
    label: "Payments Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.communities_enabled",
    label: "Communities Enabled",
    type: "boolean",
    default: "true",
  },
  {
    key: "permissions.export_payments_enabled",
    label: "Export Payments Enabled",
    type: "boolean",
    default: "true",
  },
  { key: "scopes", label: "Scopes", type: "string", list: true, choices: USER_SCOPE },
  {
    key: "scopes_assigned_to_only",
    label: "Scopes Assigned To Only",
    type: "string",
    list: true,
    choices: USER_SCOPE,
  },
  { key: "profile_photo", label: "Profile Photo", type: "string" },
]);

const perform = (async (z, bundle) => {
  const { userId, ...body } = bundle.inputData;
  const response = await z.request({
    method: "PUT",
    url: `${ENV.API_URL}/users/${userId}`,
    body,
  });
  // this should return a single object
  return response.data;
  // @ts-ignore
}) satisfies CreatePerform<InferInputData<typeof inputFields>>;

export const updateUser = defineCreate({
  key: "updateUser",
  noun: "User",

  display: {
    label: "Update User",
    description: "Updates an existing user",
  },

  operation: {
    perform,
    inputFields,

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
      contactId: "ODUO6yJQiACv40RCkSmq",
      tags: ["Test Tag1", "Test Tag2"],
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
