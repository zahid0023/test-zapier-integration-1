import { describe, expect, it } from "vitest";
import zapier from "zapier-platform-core";

import App from "../index";
import { ENV } from "../config/env";

const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe("calendar event", () => {
  const authData = { apiKey: ENV.AUTH_DATA_API_KEY };
  let testedAppointment: any = null;
  let testedBlockSlot: any = null;

  it("create-appointment: should create a appointment", async () => {
    const bundle = {
      authData,
      inputData: App.creates["createAppointmentEvent"].operation.sample,
    };

    const result: any = await appTester(
      App.creates["createAppointmentEvent"].operation.perform as any,
      bundle
    );

    console.log("Created Appointment Event:", result);

    expect(result).toBeDefined();
    expect(result).toHaveProperty("id");

    testedAppointment = result;
  });

  it("search-appointment: should find an appointment", async () => {
    const bundle = {
      authData,
      inputData: { appointmentId: testedAppointment.id },
    };

    const results = await appTester(
      App.searches["getAppointmentEvent"].operation.perform as any,
      bundle
    );
    expect(results).toBeDefined();
  });

  it("update-appointment: should modify appointment", async () => {
    const bundle = {
      authData,
      inputData: {
        calendar_id: ENV.TEST_CALENDAR_ID,
        appointmentId: testedAppointment.id,
        name: "Updated Appointment 1",
      },
    };

    const result = await appTester(
      App.creates["updateAppointmentEvent"].operation.perform as any,
      bundle
    );
    expect(result).toBeDefined();
  });

  it("search-event: should find all events", async () => {
    const bundle = {
      authData,
      inputData: App.searches["getCalendarEvents"].operation.sample,
    };

    const results = await appTester(
      App.searches["getCalendarEvents"].operation.perform as any,
      bundle
    );
    expect(results).toBeDefined();
  });

  it("create-block-slots: should create a block slots", async () => {
    const bundle = {
      authData,
      inputData: App.creates["createCalendarBlockSlot"].operation.sample,
    };

    const result: any = await appTester(
      App.creates["createCalendarBlockSlot"].operation.perform as any,
      bundle
    );

    console.log("Created Block Slot:", result);

    expect(result).toBeDefined();
    expect(result).toHaveProperty("id");

    testedBlockSlot = result;
  });

  it("search-block-slots: should find all block slots", async () => {
    const bundle = {
      authData,
      inputData: App.searches["getBlockSlots"].operation.sample,
    };

    const results = await appTester(App.searches["getBlockSlots"].operation.perform as any, bundle);
    expect(results).toBeDefined();
  });

  it("update-block-slot: should modify block slot", async () => {
    const bundle = {
      authData,
      inputData: {
        calendar_id: ENV.TEST_CALENDAR_ID,
        location_id: ENV.LOCATION_ID,
        eventId: testedBlockSlot.id,
        title: "Updated Block Slot 1",
      },
    };

    const result = await appTester(
      App.creates["updateCalendarBlockSlot"].operation.perform as any,
      bundle
    );
    expect(result).toBeDefined();
  });

  it("delete-event: should remove event", async () => {
    const bundle = {
      authData,
      inputData: { eventId: testedAppointment.id },
    };

    const result = await appTester(
      App.creates["deleteCalendarEvent"].operation.perform as any,
      bundle
    );
    expect(result).toBeDefined();
    testedAppointment = null;
  });
});
