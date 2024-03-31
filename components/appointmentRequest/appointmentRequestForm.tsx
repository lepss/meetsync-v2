"use client";

import { createAppointmentRequest } from "@/lib/actions/create-request.action";
import Link from "next/link";
import { useFormState } from "react-dom";
import { Button } from "../ui/button";

export const AppointmentRequestForm = ({
  appointmentSessionId,
  eventId,
}: {
  appointmentSessionId: string;
  eventId: string;
}) => {
  const initialState = { message: "", errors: {} };
  const createAppointmentrequestWithId = createAppointmentRequest.bind(
    null,
    appointmentSessionId
  );
  const [state, dispatch] = useFormState(
    createAppointmentrequestWithId,
    initialState
  );

  return (
    <form action={dispatch} aria-describedby="form-error">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* REQUEST FIELD */}
        <div className="mb-4">
          <label htmlFor="request" className="mb-2 block text-sm font-medium">
            Request
          </label>
          <div className="relative">
            <textarea
              name="request"
              id="request"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              rows={6}
              aria-describedby="request-error"
              placeholder="Enter request"
            ></textarea>
            {/* <User className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
          </div>
          <div id="request-error" aria-live="polite" aria-atomic="true">
            {state.errors?.request &&
              state.errors.request.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div id="form-error" aria-live="polite" aria-atomic="true">
          {state.errors && (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/events/${eventId}/appointmentSessions/${appointmentSessionId}`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Apply</Button>
      </div>
    </form>
  );
};
