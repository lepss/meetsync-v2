"use client";

import { createEvent } from "@/lib/actions/create-event.action";
import { Tags } from "@/lib/queries/tag.query";
import Link from "next/link";
import { FormEvent, useCallback, useState } from "react";
import { useFormState } from "react-dom";
import { ImageUpload } from "../ui/ImageUpload";
import { Button } from "../ui/button";
import { DatePickerWithRange } from "./DateRangePicker";
import { TagPicker } from "./TagPicker";

export const EventForm = ({ tagList }: { tagList: Tags }) => {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createEvent, initialState);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<String[]>([]);
  const [dates, setDates] = useState<Date[] | undefined>();

  const handleFormDataReady = useCallback((file: File | null) => {
    setImageFile(file);
  }, []);

  const handleSelectedTagsChange = (newSelectedTags: String[]) => {
    setSelectedTags(newSelectedTags);
  };

  const handleSelectedDateChange = (newDate: Date[] | undefined) => {
    setDates(newDate);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    if (imageFile) {
      formData.delete("image");
      formData.append("image", imageFile);
    }

    formData.append("tags", selectedTags.join(","));
    formData.append(
      "dates",
      dates?.map((d) => d.toISOString()).join(",") || ""
    );
    console.log(Object.fromEntries(formData.entries()));
    // dispatch(formData);
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
              placeholder="Enter event title"
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
              placeholder="Enter event description"
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
        {/* LOCATION FIELD */}
        <div className="mb-4">
          <label htmlFor="location" className="mb-2 block text-sm font-medium">
            Location
          </label>
          <div className="relative">
            <input
              id="location"
              name="location"
              type="text"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Enter event location"
              aria-describedby="location-error"
            />
            {/* <User className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
          </div>
          <div id="location-error" aria-live="polite" aria-atomic="true">
            {state.errors?.location &&
              state.errors.location.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* DATE FIELD */}
        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block text-sm font-medium">
            Date
          </label>
          <div className="relative">
            <DatePickerWithRange
              onSelectedDateChange={handleSelectedDateChange}
            />
          </div>
        </div>
        {/* APPOINTMENT DURATION FIELD */}
        <div className="mb-4">
          <div className="block justify-between gap-4 lg:flex">
            <div className="w-full">
              <label
                htmlFor="appointment_duration"
                className="mb-2 block text-sm font-medium"
              >
                Appointment Duration
              </label>
              <div className="relative">
                <input
                  id="appointment_duration"
                  name="appointment_duration"
                  type="number"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                  placeholder="Enter appointment duration"
                  aria-describedby="appointment_duration-error"
                  step={5}
                  min={0}
                />
                {/* <User className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
              </div>
              <div
                id="appointment_duration-error"
                aria-live="polite"
                aria-atomic="true"
              >
                {state.errors?.appointment_duration &&
                  state.errors.appointment_duration.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            {/* BREAK DURATION FIELD */}
            <div className="mt-4 w-full lg:mb-4 lg:mt-0">
              <label
                htmlFor="break_duration"
                className="mb-2 block text-sm font-medium"
              >
                Break Duration
              </label>
              <div className="relative">
                <input
                  id="break_duration"
                  name="break_duration"
                  type="number"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                  placeholder="Enter break duration"
                  aria-describedby="break_duration-error"
                  step={5}
                  min={0}
                />
                {/* <User className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
              </div>
              <div
                id="break_duration-error"
                aria-live="polite"
                aria-atomic="true"
              >
                {state.errors?.break_duration &&
                  state.errors.break_duration.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {/* TAGS FIELD */}
        <div className="mb-4">
          <label htmlFor="tag" className="mb-2 block text-sm font-medium">
            Tags
          </label>
          <div className="relative">
            <TagPicker
              tagList={tagList}
              onSelectedTagsChange={handleSelectedTagsChange}
            />
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
          href="/events"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Event</Button>
      </div>
    </form>
  );
};
