export const TEAM_MEMBER_PRIORITY_ENUM = {
  0: 0,
  0.5: 0.5,
  1: 1,
} as const;

export const LOCATION_CONFIG_KIND_ENUM = {
  custom: "custom",
  zoom_conference: "zoom_conference",
  google_conference: "google_conference",
  inbound_call: "inbound_call",
  outbound_call: "outbound_call",
  physical: "physical",
  booker: "booker",
  ms_teams_conference: "ms_teams_conference",
} as const;
