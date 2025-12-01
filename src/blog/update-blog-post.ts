import {
  defineInputFields,
  defineCreate,
  type CreatePerform,
  type InferInputData,
} from "zapier-platform-core";
import { ENV } from "../config/env.js";
import { Timezone } from "../enums/timezone.enum.js";
import { BLOG_STATUS_ENUM } from "../enums/blog.enum.js";

const inputFields = defineInputFields([
  { key: "postId", label: "Post ID", type: "string", required: true },
  { key: "title", label: "Title", type: "string", required: true },
  {
    key: "blog_id",
    label: "Blog ID",
    type: "string",
    required: true,
    helpText: "You can find the blog id from blog site dashboard link",
  },
  { key: "image_url", label: "Image URL", type: "string", required: true },
  { key: "description", label: "Description", type: "text", required: true },
  {
    key: "raw_html",
    label: "Raw HTML",
    type: "string",
    helpText: "<h1>Your blog content</h1>",
    required: true,
  },
  { key: "status", label: "Status", type: "string", choices: BLOG_STATUS_ENUM, required: true },
  {
    key: "image_alt_text",
    label: "Image Alt Text",
    type: "string",
    required: true,
    helpText: "Alt text for your blog image",
  },
  {
    key: "categories",
    label: "Categories",
    type: "string",
    required: true,
    list: true,
    helpText:
      "This needs to be array of category ids, which you can get from the category get api call.",
  },
  { key: "tags", label: "Tags", type: "string", list: true },
  {
    key: "author",
    label: "Author",
    type: "string",
    required: true,
    helpText: "Get the author id from 'Get All Blog Authors' action.",
  },
  { key: "url_slug", label: "URL Slug", type: "string", required: true },
  { key: "canonical_link", label: "Canonical Link", type: "string", required: true },
  {
    key: "published_date",
    label: "Published Date",
    type: "string",
    required: true,
    placeholder: "YYYY-MM-DD",
    helpText: "Format: YYYY-MM-DD",
  },
  {
    key: "published_time",
    label: "Published Time",
    type: "string",
    required: true,
    placeholder: "HH:MM:SS",
    helpText: "Format: HH:MM:SS",
  },
  { key: "time_zone", label: "Time Zone", type: "string", required: true, choices: Timezone },
]);

// create a particular calendar by name
const perform = (async (z, bundle) => {
  const { postId, ...body } = bundle.inputData;
  const response = await z.request({
    method: "PUT",
    url: `${ENV.API_URL}/blogs/posts/${postId}`,
    body,
  });
  // this should return a single object
  return response.data;
}) satisfies CreatePerform<InferInputData<typeof inputFields>>;

export const updateBlogPost = defineCreate({
  key: "updateBlogPost",
  noun: "Blog Post",

  display: {
    label: "Update Blog Post",
    description: "Updates an existing blog post",
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
