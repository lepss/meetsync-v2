"use server";

import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { uploadImage } from "./upload-image.action";

const FormSchema = z.object({
  name: z
    .string({ invalid_type_error: "Please enter a valid name" })
    .min(2, { message: "Name should be greater than 2 charaters" })
    .max(50, { message: "Name should be less than 50 charaters" }),
  description: z
    .string({ invalid_type_error: "Please enter a valid description" })
    .min(2, { message: "Description should be greater than 2 charaters" })
    .max(500, { message: "Description should be less than 50 charaters" }),
  location: z
    .string({ invalid_type_error: "Please enter a valid description" })
    .min(2, { message: "Location should be greater than 2 charaters" })
    .max(50, { message: "Location should be less than 50 charaters" }),
  appointment_duration: z.coerce
    .number({ invalid_type_error: "Please enter a valid duration" })
    .min(5, { message: "Duration should be greater than 5 min" })
    .max(120, { message: "Duration should be less than 120 min" }),
  break_duration: z.coerce
    .number({ invalid_type_error: "Please enter a valid duration" })
    .min(2, { message: "Duration should be greater than 2 min" })
    .max(120, { message: "Duration should be less than 120 min" }),
  image: z
    .any()
    .refine((file) => file?.length !== 0, { message: "File is required." }),
});

const CreateEvent = FormSchema.omit({});
const UpdateEvent = FormSchema.omit({});

export type State = {
  errors?: {
    name?: string[];
    description?: string[];
    location?: string[];
    appointment_duration?: string[];
    break_duration?: string[];
    images?: string[];
  };
  message?: string | null;
};

export async function createEvent(prevState: State, formData: FormData) {
  const session = await getAuthSession();
  if (!session || !session.user || !session.user.id) {
    throw new Error("You must be logged in to create an event.");
  }

  const validatedFields = CreateEvent.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    location: formData.get("location"),
    appointment_duration: formData.get("appointment_duration"),
    break_duration: formData.get("break_duration"),
    image: formData.get("image"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Event.",
    };
  }

  let imageUrl = null;
  if (validatedFields.data.image !== null) {
    try {
      imageUrl = await uploadImage(validatedFields.data.image);
    } catch (error) {
      return { message: "Database error: Unable to upload event image." };
    }
  }

  try {
    const dbEvent = await prisma.event.create({
      data: {
        ...validatedFields.data,
        image: imageUrl,
        userId: session.user.id,
      },
    });
  } catch (error) {
    return { message: "Database error: Unable to create event." };
  }

  revalidatePath("/events");
  redirect("/events");
}
