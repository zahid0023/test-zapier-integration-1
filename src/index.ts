import { defineApp, version as platformVersion } from "zapier-platform-core";
import packageJson from "../package.json" with { type: "json" };

import authentication from "./authentication.js";
import { afters, befores } from "./middleware.js";

import { createContact } from "./contact/create-contact.js";
import { updateContact } from "./contact/update-contact.js";
import { deleteContact } from "./contact/delete-contact.js";
import { getContact } from "./contact/get-contact.js";

import createTask from "./creates/task.js";
import updateTask from "./updates/task.js";
import deleteTask from "./deletes/task.js";
import findTask from "./searches/task.js";

import createNote from "./creates/note.js";
import updateNote from "./updates/note.js";
import deleteNote from "./deletes/note.js";
import findNote from "./searches/note.js";

import createCustomField from "./creates/custom-field.js";
import updateCustomField from "./updates/custom-field.js";
import deleteCustomField from "./deletes/custom-field.js";
import findCustomField from "./searches/custom-field.js";
import {
  createConversation,
  updateConversation,
  deleteConversation,
  searchConversation,
} from "./conversation/index.js";
import {
  createCustomValue,
  updateCustomValue,
  deleteCustomValue,
  searchCustomValue,
} from "./custom-value/index.js";
import {
  createAppointmentNote,
  updateAppointmentNote,
  deleteAppointmentNote,
  searchAppointmentNote,
} from "./appointment-note/index.js";
import { createLocationTag, updateLocationTag, deleteLocationTag, searchLocationTag, createContactTag, deleteContactTag } from "./tag/index.js";
import {
  createLocation,
  deleteLocation,
  searchLocation,
  updateLocation,
} from "./sub-account/index.js";
import { createWorkflow, deleteWorkflow } from "./workflow/index.js";
import { completeTask } from "./task/complete-task.js";
import {
  createAppointmentEvent,
  updateAppointmentEvent,
  deleteCalendarEvent,
  createCalendarBlockSlot,
  updateCalendarBlockSlot,
} from "./calendar-event/index.js";
import { getBlockSlots } from "./calendar-event/get-block-slots.js";
import { getTasks } from "./task/get-tasks.js";
import { getNotes } from "./note/get-notes.js";
import { getAppointment } from "./calendar-event/get-appointment.js";
import { getCalendarEvents } from "./calendar-event/get-calendar-events.js";

export default defineApp({
  // IMPORTANT: Note the use of `defineApp`
  version: packageJson.version,
  platformVersion,

  // Authentication & Middleware
  authentication,
  beforeRequest: [...befores],
  afterResponse: [...afters],

  creates: {
    // Contacts
    [createContact.key]: createContact,
    [updateContact.key]: updateContact,
    [deleteContact.key]: deleteContact,
    // Tasks
    [createTask.key]: createTask,
    [updateTask.key]: updateTask,
    [deleteTask.key]: deleteTask,
    [completeTask.key]: completeTask,
    // Notes
    [createNote.key]: createNote,
    [updateNote.key]: updateNote,
    [deleteNote.key]: deleteNote,
    // Custom Fields
    [createCustomField.key]: createCustomField,
    [updateCustomField.key]: updateCustomField,
    [deleteCustomField.key]: deleteCustomField,

    // Conversations
    [createConversation.key]: createConversation,
    [updateConversation.key]: updateConversation,
    [deleteConversation.key]: deleteConversation,

    // Custom Values
    [createCustomValue.key]: createCustomValue,
    [updateCustomValue.key]: updateCustomValue,
    [deleteCustomValue.key]: deleteCustomValue,

    // Appointment Notes
    [createAppointmentNote.key]: createAppointmentNote,
    [updateAppointmentNote.key]: updateAppointmentNote,
    [deleteAppointmentNote.key]: deleteAppointmentNote,
    [createContactTag.key]: createContactTag,
    [deleteContactTag.key]: deleteContactTag,

    // Tags
    [createLocationTag.key]: createLocationTag,
    [updateLocationTag.key]: updateLocationTag,
    [deleteLocationTag.key]: deleteLocationTag,

    // Sub-Accounts (Locations)
    [createLocation.key]: createLocation,
    [updateLocation.key]: updateLocation,
    [deleteLocation.key]: deleteLocation,

    // Workflows
    [createWorkflow.key]: createWorkflow,
    [deleteWorkflow.key]: deleteWorkflow,

    // Calendar Events
    [createAppointmentEvent.key]: createAppointmentEvent,
    [updateAppointmentEvent.key]: updateAppointmentEvent,
    [deleteCalendarEvent.key]: deleteCalendarEvent,
    [createCalendarBlockSlot.key]: createCalendarBlockSlot,
    [updateCalendarBlockSlot.key]: updateCalendarBlockSlot,
  },

  searches: {
    [getContact.key]: getContact,
    [findTask.key]: findTask,
    [getTasks.key]: getTasks,
    [findNote.key]: findNote,
    [getNotes.key]: getNotes,
    [findCustomField.key]: findCustomField,
    [searchConversation.key]: searchConversation,
    [searchCustomValue.key]: searchCustomValue,
    [searchAppointmentNote.key]: searchAppointmentNote,
    [searchLocationTag.key]: searchLocationTag,
    [searchLocation.key]: searchLocation,
    [getCalendarEvents.key]: getCalendarEvents,
    [getBlockSlots.key]: getBlockSlots,
    [getAppointment.key]: getAppointment,
  },

  triggers: {},
});
