"use client";

import { createAppointmentSession } from "@/lib/actions/create-session.action";
import Link from "next/link";
import { FormEvent, useCallback, useState } from "react";
import { useFormState } from "react-dom";
import { ImageUpload } from "../ui/ImageUpload";
import { Button } from "../ui/button";

export const AppointmentSessionForm = ({ eventId }: { eventId: string }) => {
  const initialState = { message: "", errors: {} };
  const createAppointmentSessionWithId = createAppointmentSession.bind(
    null,
    eventId
  );
  const [state, dispatch] = useFormState(
    createAppointmentSessionWithId,
    initialState
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFormDataReady = useCallback((file: File | null) => {
    setImageFile(file);
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    if (imageFile) {
      formData.delete("image");
      formData.append("image", imageFile);
    }
    // console.log(Object.fromEntries(formData.entries()));
    dispatch(formData);
  };

  return (
    <form onSubmit={handleSubmit} aria-describedby="form-error">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* TITLE FIELD */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Enter appointment session title"
              aria-describedby="name-error"
            />
            {/* <User className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* DESCRIPTION FIELD */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Description
          </label>
          <div className="relative">
            <textarea
              name="description"
              id="description"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              rows={6}
              aria-describedby="description-error"
              placeholder="Enter appointment session description"
            ></textarea>
            {/* <User className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
          </div>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* IMAGE FIELD */}
        <div className="mb-4">
          <label htmlFor="image" className="mb-2 block text-sm font-medium">
            Image
          </label>
          <div className="relative">
            <ImageUpload onFormDataReady={handleFormDataReady} />
            {/* <User className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
          </div>
          <div id="image-error" aria-live="polite" aria-atomic="true">
            {state.errors?.image &&
              state.errors.image.map((error: string) => (
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
          href={`/events/${eventId}`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Appointment Session</Button>
      </div>
    </form>
  );
};
