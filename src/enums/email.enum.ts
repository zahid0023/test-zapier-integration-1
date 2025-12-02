export const EMAIL_SCHEDULE_STATUS_ENUM = {
  active: "Active",
  pause: "Pause",
  complete: "Complete",
  cancelled: "Cancelled",
  retry: "Retry",
  draft: "Draft",
  "resend-scheduled": "Resend Scheduled",
} as const;

export const EMAIL_DELIVERY_STATUS_ENUM = {
  all: "All",
  "not-started": "Not Started",
  paused: "Paused",
  cancelled: "Cancelled",
  processing: "Processing",
  resumed: "Resumed",
  "next-drip": "Next Drip",
  complete: "Complete",
  success: "Success",
  error: "Error",
  waiting: "Waiting",
  queued: "Queued",
  queueing: "Queueing",
  reading: "Reading",
  scheduled: "Scheduled",
} as const;
