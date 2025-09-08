import type { ZObject, Bundle, Authentication } from 'zapier-platform-core';

// You want to make a request to an endpoint that is either specifically designed
// to test auth, or one that every user will have access to. eg: `/me`.
// By returning the entire request object, you have access to the request and
// response data for testing purposes. Your connection label can access any data
// from the returned response using the `json.` prefix. eg: `{{json.username}}`.
const test = (z: ZObject, bundle: Bundle) =>
  z.request({ url: 'http://34.227.215.210:8080/api/v1/authorization/ping' });

export default {
  // "custom" is the catch-all auth type. The user supplies some info and Zapier can
  // make authenticated requests with it
  type: 'custom',

  // Define any input app's auth requires here. The user will be prompted to enter
  // this info when they connect their account.
  fields: [
    {
      key: 'apiKey',
      label: 'API Key',
      required: true,
      type: 'string'
    }
  ],

  // The test method allows Zapier to verify that the credentials a user provides
  // are valid. We'll execute this method whenever a user connects their account for
  // the first time.
  test,

} satisfies Authentication;
