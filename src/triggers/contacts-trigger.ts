// // ./src/triggers/pollingTrigger.ts

// import { defineInputFields, defineTrigger, type PollingTriggerPerform } from "zapier-platform-core";
// import { ENV } from "../config/env.js";

// const inputFields = defineInputFields([
//   {
//     key: "country",
//     type: "string",
//     required: false,
//   },
// ]);

// const perform = (async (z, bundle) => {
//   // `bundle.inputData` typed as `{ country?: string }`
//   const response = await z.request(`${ENV.API_URL}/movies`);
//   return response.data;
// }) satisfies PollingTriggerPerform<typeof inputFields>; // IMPORTANT: Note `satisfies`

// export default defineTrigger({
//   key: "movie",
//   noun: "Movie",

//   display: {
//     label: "New Movie",
//     description: "Triggers when a new movie is created.",
//   },

//   operation: {
//     type: "polling",
//     inputFields,
//     perform,
//     sample: {
//       id: "1",
//       title: "example",
//     },
//   },
// });
