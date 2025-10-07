import "dotenv/config";

export const ENV = {
  API_URL: process.env.API_URL,
  // Testing values
  AUTH_DATA_API_KEY: process.env.authData_apiKey ?? "default_api_key",
  LOCATION_ID: process.env.LOCATION_ID ?? "IxfSlEIQQeiOYQlVEApa",
  TEST_CONTACT_ID: process.env.TEST_CONTACT_ID ?? "ODUO6yJQiACv40RCkSmq",
  TEST_WORKFLOW_ID: process.env.TEST_WORKFLOW_ID ?? "sx6wyHhbFdRXh302LLNR",
  TEST_COMPANY_ID: process.env.TEST_COMPANY_ID ?? "default_test_company_id",
  TEST_CALENDAR_ID: process.env.TEST_CALENDAR_ID ?? "default_test_calendar_id",
  TEST_GROUP_ID: process.env.TEST_GROUP_ID ?? "default_test_group_id",
  TEST_USER_ID: process.env.TEST_USER_ID ?? "default_test_user_id",
  TEST_ORIGIN_ID: process.env.TEST_ORIGIN_ID ?? "default_test_origin_id",
};
