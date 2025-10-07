// import {
//   defineInputFields,
//   defineCreate,
//   type CreatePerform,
//   type InferInputData,
// } from "zapier-platform-core";
// import { ENV } from "../config/env.js";
// import { LOCATION_CONFIG_KIND_ENUM, TEAM_MEMBER_PRIORITY_ENUM } from "../enums/calendar.enum.js";

// const inputFields = defineInputFields([
//   { key: "group_id", label: "Group ID", type: "string" },
//   {
//     key: "team_members",
//     label: "Team Members",
//     children: [
//       { key: "user_id", label: "User ID", type: "string", required: true },
//       { key: "priority", label: "Priority", type: "number", choices: TEAM_MEMBER_PRIORITY_ENUM },
//       { key: "is_primary", label: "Is Primary", type: "boolean" },
//       {
//         key: "location_configurations",
//         label: "Location Configurations",
//         children: [
//           {
//             key: "kind",
//             label: "Kind",
//             type: "string",
//             required: true,
//             choices: LOCATION_CONFIG_KIND_ENUM,
//           },
//           { key: "location", type: "string", label: "Location" },
//         ],
//       },
//     ],
//   },
//   { key: "event_type", label: "Event Type", type: "string" },
//   { key: "name", label: "Name", type: "string", required: true },
//   { key: "description", label: "Description", type: "string" },
//   { key: "slug", label: "Slug", type: "string" },
//   { key: "widget_slug", label: "Widget Slug", type: "string" },
//   { key: "widget_type", label: "Widget Type", type: "string" },
//   { key: "event_title", label: "Event Title", type: "string" },
//   { key: "event_color", label: "Event Color", type: "string" },
//   {
//     key: "location_configurations",
//     label: "Location Configurations",
//     required: false,
//     children: [
//       { key: "kind", label: "Kind", type: "string", required: true },
//       { key: "location", label: "Location", type: "string" },
//     ],
//   },
//   { key: "slot_duration", label: "Slot Duration", type: "number" },
//   { key: "slot_duration_unit", label: "Slot Duration Unit", type: "string" },
//   { key: "pre_buffer_unit", label: "Pre Buffer Unit", type: "string" },
//   { key: "slot_interval", label: "Slot Interval", type: "number" },
//   { key: "slot_interval_unit", label: "Slot Interval Unit", type: "string" },
//   { key: "slot_buffer", label: "Slot Buffer", type: "number" },
//   { key: "pre_buffer", label: "Pre Buffer", type: "number" },
//   { key: "appointment_per_slot", label: "Appointment Per Slot", type: "number" },
//   { key: "appointment_per_day", label: "Appointment Per Day", type: "number" },
//   { key: "allow_booking_after", label: "Allow Booking After", type: "number" },
//   {
//     key: "allow_booking_after_unit",
//     label: "Allow Booking After Unit",
//     type: "string",
//     required: false,
//   },
//   { key: "allow_booking_for", label: "Allow Booking For", type: "number" },
//   {
//     key: "allow_booking_for_unit",
//     label: "Allow Booking For Unit",
//     type: "string",
//     required: false,
//   },
//   {
//     key: "open_hours",
//     label: "Open Hours",
//     required: false,
//     children: [
//       {
//         key: "daysOfTheWeek",
//         label: "Days of the Week",
//         type: "number",
//         required: true,
//         list: true,
//       },
//       {
//         key: "openHours",
//         label: "Open Hours",
//         required: true,
//         children: [
//           { key: "openHour", label: "Open Hour", type: "number", required: true },
//           { key: "openMinute", label: "Open Minute", type: "number", required: true },
//           { key: "closeHour", label: "Close Hour", type: "number", required: true },
//           { key: "closeMinute", label: "Close Minute", type: "number", required: true },
//         ],
//       },
//     ],
//   },
//   { key: "enable_recurring", label: "Enable Recurring", type: "boolean" },
//   {
//     key: "recurring",
//     label: "Recurring",
//     required: false,
//     children: [
//       {
//         key: "freq",
//         label: "Frequency",
//         type: "string",
//         required: true,
//       },
//       {
//         key: "count",
//         label: "Count",
//         type: "number",
//         required: false,
//       },
//       {
//         key: "booking_option",
//         label: "Booking Option",
//         type: "string",
//         required: false,
//       },
//       {
//         key: "booking_overlap_default_status",
//         label: "Booking Overlap Default Status",
//         type: "string",
//         required: false,
//       },
//     ],
//   },
//   {
//     key: "form_id",
//     label: "Form ID",
//     type: "string",
//     required: false,
//   },
//   {
//     key: "sticky_contact",
//     label: "Sticky Contact",
//     type: "boolean",
//     required: false,
//   },
//   {
//     key: "is_live_payment_mode",
//     label: "Is Live Payment Mode",
//     type: "boolean",
//     required: false,
//   },
//   {
//     key: "auto_confirm",
//     label: "Auto Confirm",
//     type: "boolean",
//     required: false,
//   },
//   {
//     key: "should_send_alert_emails_to_assigned_member",
//     label: "Should Send Alert Emails to Assigned Member",
//     type: "boolean",
//     required: false,
//   },
//   {
//     key: "alert_email",
//     label: "Alert Email",
//     type: "string",
//     required: false,
//   },
//   {
//     key: "google_invitation_emails",
//     label: "Google Invitation Emails",
//     type: "boolean",
//     required: false,
//   },
//   {
//     key: "allow_reschedule",
//     label: "Allow Reschedule",
//     type: "boolean",
//     required: false,
//   },
//   {
//     key: "allow_cancellation",
//     label: "Allow Cancellation",
//     type: "boolean",
//     required: false,
//   },
//   {
//     key: "should_assign_contact_to_team_member",
//     label: "Should Assign Contact to Team Member",
//     type: "boolean",
//     required: false,
//   },
//   {
//     key: "should_skip_assigning_contact_for_existing",
//     label: "Should Skip Assigning Contact for Existing",
//     type: "boolean",
//     required: false,
//   },
//   {
//     key: "notes",
//     label: "Notes",
//     type: "string",
//     required: false,
//   },
//   {
//     key: "pixel_id",
//     label: "Pixel ID",
//     type: "string",
//     required: false,
//   },
//   {
//     key: "form_submit_type",
//     label: "Form Submit Type",
//     type: "string",
//     required: false,
//   },
//   {
//     key: "form_submit_redirect_url",
//     label: "Form Submit Redirect URL",
//     type: "string",
//     required: false,
//   },
//   {
//     key: "form_submit_thanks_message",
//     label: "Form Submit Thanks Message",
//     type: "string",
//     required: false,
//   },
//   {
//     key: "availability_type",
//     label: "Availability Type",
//     type: "number",
//     required: false,
//   },
//   {
//     key: "availabilities",
//     label: "Availabilities",
//     children: [
//       { key: "date", type: "string", label: "Date", required: true },
//       {
//         key: "hours",
//         label: "Hours",
//         required: true,
//         children: [
//           {
//             key: "open_hour",
//             type: "number",
//             label: "Open Hour",
//             required: true,
//           },
//           {
//             key: "open_minute",
//             type: "number",
//             label: "Open Minute",
//             required: true,
//           },
//           {
//             key: "close_hour",
//             type: "number",
//             label: "Close Hour",
//             required: true,
//           },
//           {
//             key: "close_minute",
//             type: "number",
//             label: "Close Minute",
//             required: true,
//           },
//         ],
//       },
//       {
//         key: "deleted",
//         type: "boolean",
//         label: "Deleted",
//         required: false,
//       },
//     ],
//   },
//   {
//     key: "guest_type",
//     type: "string",
//     label: "Guest Type",
//     required: false,
//   },
//   {
//     key: "consent_label",
//     type: "string",
//     label: "Consent Label",
//     required: false,
//   },
//   {
//     key: "calendar_cover_image",
//     type: "string",
//     label: "Calendar Cover Image",
//     required: false,
//   },
//   {
//     key: "look_busy_config",
//     label: "Look Busy Config",
//     required: false,
//     children: [
//       { key: "enabled", type: "boolean", label: "Enabled", required: true },
//       {
//         key: "look_busy_percentage",
//         type: "number",
//         label: "Look Busy Percentage",
//         required: true,
//       },
//     ],
//   },
//   {
//     key: "is_active",
//     type: "boolean",
//     label: "Is Active",
//     required: false,
//   },
//   {
//     key: "location_id",
//     type: "string",
//     label: "Location ID",
//     required: false,
//   },
//   {
//     key: "calendar_type",
//     type: "string",
//     label: "Calendar Type",
//     required: false,
//   },
// ]);

// // create a particular calendar by name
// const perform = (async (z, bundle) => {
//   const response = await z.request({
//     method: "POST",
//     url: `${ENV.API_URL}/calendars`,
//     body: bundle.inputData,
//   });
//   // this should return a single object
//   return response.data;
// }) satisfies CreatePerform<InferInputData<typeof inputFields>>;

// export default defineCreate({
//   key: "createCalendar",
//   noun: "Create Calendar",

//   display: {
//     label: "Create Calendar",
//     description: "Creates a new calendar",
//   },

//   operation: {
//     perform,

//     // `inputFields` defines the fields a user could provide
//     // Zapier will pass them in as `bundle.inputData` later. They're optional.
//     // End-users will map data into these fields. In general, they should have any fields that the API can accept. Be sure to accurately mark which fields are required!
//     inputFields,

//     // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
//     // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
//     // returned records, and have obvious placeholder values that we can show to any user.
//     sample: {
//       id: 1,
//       name: "Test",
//     },

//     // If fields are custom to each user (like spreadsheet columns), `outputFields` can create human labels
//     // For a more complete example of using dynamic fields see
//     // https://github.com/zapier/zapier-platform/tree/main/packages/cli#customdynamic-fields
//     // Alternatively, a static field definition can be provided, to specify labels for the fields
//     outputFields: [
//       // these are placeholders to match the example `perform` above
//       // {key: 'id', label: 'Person ID'},
//       // {key: 'name', label: 'Person Name'}
//     ],
//   },
// });
