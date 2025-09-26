import { defineApp, version as platformVersion } from "zapier-platform-core";
import packageJson from "../package.json" with { type: "json" };

import authentication from "./authentication.js";
import { afters, befores } from "./middleware.js";

import { createContact } from "./contact/create-contact.js";
import { updateContact } from "./contact/update-contact.js";
import { deleteContact } from "./contact/delete-contact.js";
import { getContact } from "./contact/get-contact.js";

import { createTask } from "./task/create-task.js";
import { updateTask } from "./task/update-task.js";
import { deleteTask } from "./task/delete-task.js";
import { getTasks } from "./task/get-tasks.js";
import { getTask } from "./task/get-task.js";
import { completeTask } from "./task/complete-task.js";

import { getAppointments } from "./appointment/get-appointments.js";

import { createNote } from "./note/create-note.js";
import { updateNote } from "./note/update-note.js";
import { deleteNote } from "./note/delete-note.js";
import { getNotes } from "./note/get-notes.js";
import { getNote } from "./note/get-note.js";

import { createCustomField } from "./custom-field/create-custom-field.js";
import { updateCustomField } from "./custom-field/update-custom-field.js";
import { deleteCustomField } from "./custom-field/delete-custom-field.js";
import { getCustomFields } from "./custom-field/get-custom-fields.js";
import { getCustomField } from "./custom-field/get-custom-field.js";

import { createCustomValue } from "./custom-value/create-custom-value.js";
import { updateCustomValue } from "./custom-value/update-custom-value.js";
import { deleteCustomValue } from "./custom-value/delete-custom-value.js";
import { getCustomValues } from "./custom-value/get-custom-values.js";
import { getCustomValue } from "./custom-value/get-custom-value.js";

import {
  createConversation,
  updateConversation,
  deleteConversation,
  searchConversation,
} from "./conversation/index.js";

import {
  createAppointmentNote,
  updateAppointmentNote,
  deleteAppointmentNote,
  searchAppointmentNote,
} from "./appointment-note/index.js";
import { createLocationTag, updateLocationTag, deleteLocationTag,  createContactTag, deleteContactTag, getLocationTag } from "./tag/index.js";
import {
  createLocation,
  deleteLocation,
  searchLocation,
  updateLocation,
} from "./sub-account/index.js";
import { addContactWorkflow, deleteContactWorkflow } from "./workflow/index.js";

import { getBlockSlots } from "./calendar-event/get-block-slots.js";
import { getAppointmentEvent } from "./calendar-event/get-appointment.js";
import { getCalendarEvents } from "./calendar-event/get-calendar-events.js";
import { getLocationTags } from "./tag/get-location-tags.js";
import { createAppointmentEvent } from "./calendar-event/create-appointment.js";
import { updateAppointmentEvent } from "./calendar-event/update-appointment.js";
import { deleteCalendarEvent } from "./calendar-event/delete-calendar-event.js";
import { createCalendarBlockSlot } from "./calendar-event/create-block-slot.js";
import { updateCalendarBlockSlot } from "./calendar-event/update-block-slot.js";


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
    [addContactWorkflow.key]: addContactWorkflow,
    [deleteContactWorkflow.key]: deleteContactWorkflow,

    // Calendar Events
    [createAppointmentEvent.key]: createAppointmentEvent,
    [updateAppointmentEvent.key]: updateAppointmentEvent,
    [deleteCalendarEvent.key]: deleteCalendarEvent,
    [createCalendarBlockSlot.key]: createCalendarBlockSlot,
    [updateCalendarBlockSlot.key]: updateCalendarBlockSlot,
  },

  searches: {
    [getContact.key]: getContact,

    [getTasks.key]: getTasks,
    [getTask.key]: getTask,

    [getAppointments.key]: getAppointments,

    [getLocationTags.key]: getLocationTags,
    [getLocationTag.key]: getLocationTag,

    [getNotes.key]: getNotes,
    [getNote.key]: getNote,

    [getCustomFields.key]: getCustomFields,
    [getCustomField.key]: getCustomField,

    [getCustomValues.key]: getCustomValues,
    [getCustomValue.key]: getCustomValue,

    [searchConversation.key]: searchConversation,
    [searchAppointmentNote.key]: searchAppointmentNote,
    [searchLocation.key]: searchLocation,

    [getCalendarEvents.key]: getCalendarEvents,
    [getBlockSlots.key]: getBlockSlots,
    [getAppointmentEvent.key]: getAppointmentEvent,
  },

  triggers: {},
});
