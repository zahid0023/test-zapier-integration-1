export const CUSTOM_FIELD_MODEL_ENUM = {
  contact: "Contact",
  opportunity: "Opportunity",
} as const;

export const CUSTOM_FIELD_DATA_TYPE_ENUM = {
  TEXT: "TEXT",
  LARGE_TEXT: "LARGE_TEXT",
  NUMERICAL: "NUMERICAL",
  PHONE: "PHONE",
  MONETORY: "MONETORY",
  CHECKBOX: "CHECKBOX",
  SINGLE_OPTIONS: "SINGLE_OPTIONS",
  MULTIPLE_OPTIONS: "MULTIPLE_OPTIONS",
  DATE: "DATE",
  TEXTBOX_LIST: "TEXTBOX_LIST",
  FILE_UPLOAD: "FILE_UPLOAD",
  RADIO: "RADIO",
  EMAIL: "EMAIL",
} as const;

export const CUSTOM_FIELD_ACCEPTED_FORMAT_ENUM = {
  ".pdf": "PDF",
  ".docx": "DOCX",
  ".doc": "DOC",
  ".jpg": "JPG",
  ".jpeg": "JPEG",
  ".png": "PNG",
  ".gif": "GIF",
  ".csv": "CSV",
  ".xlsx": "XLSX",
  ".xls": "XLS",
  all: "ALL",
} as const;
