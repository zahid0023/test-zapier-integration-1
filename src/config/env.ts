import "dotenv/config";

export const ENV = {
  API_URL: process.env.API_URL,
  AUTH_DATA_API_KEY: process.env.authData_apiKey ?? "default_api_key",
  LOCATION_ID: process.env.LOCATION_ID ?? "IxfSlEIQQeiOYQlVEApa",
};
