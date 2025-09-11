import { type FieldChoices } from "zapier-platform-core";

export const GENDER_ENUM: FieldChoices = {
  male: "Male",
  female: "Female",
  other: "Other",
} as const;

export const DND_STATUS_ENUM: FieldChoices = {
  active: "Active",
  inactive: "Inactive",
  permanent: "Permanent",
} as const;

export const INBOUND_DND_STATUS_ENUM: FieldChoices = {
  active: "Active",
  inactive: "Inactive",
} as const;
