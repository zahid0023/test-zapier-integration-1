import { defineApp, version as platformVersion } from "zapier-platform-core";
import packageJson from "../package.json" with { type: "json" };

import authentication from "./authentication.js";
import { afters, befores } from './middleware.js';

import createContact from "./creates/contact.js";
import deleteContact from "./deletes/contact.js";
import updateContact from "./updates/contact.js";
import findContact from './searches/contact.js';

import createTask from "./creates/task.js";
import deleteTask from "./deletes/task.js";
import updateTask from "./updates/task.js";
import findTask from './searches/task.js';

import createNote from "./creates/note.js";
import deleteNote from "./deletes/note.js";
import updateNote from "./updates/note.js";
import findNote from './searches/note.js';

export default defineApp({
  // IMPORTANT: Note the use of `defineApp`
  version: packageJson.version,
  platformVersion,

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
    // Notes
    [createNote.key]: createNote,
    [updateNote.key]: updateNote,
    [deleteNote.key]: deleteNote
  },
  
  searches: {
    [findContact.key]: findContact,
    [findTask.key]: findTask,
    [findNote.key]: findNote
  },

  triggers: {},
});