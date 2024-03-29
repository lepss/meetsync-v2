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
  image: z
    .any()
    .refine((file) => file?.length !== 0, { message: "File is required." }),
});

const CreateAppointmentSession = FormSchema.omit({});
const UpdateAppointmentSession = FormSchema.omit({});

export type State = {
  errors?: {
    name?: string[];
    description?: string[];
    image?: string[];
  };
  message?: string | null;
};

export async function createAppointmentSession(
  eventId: string,
  prevState: State,
  formData: FormData
) {
  const session = await getAuthSession();
  if (!session || !session.user || !session.user.id) {
    throw new Error("You must be logged in to create an appointment session");
  }

  const validatedFields = CreateAppointmentSession.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    image: formData.get("image"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Appointment Session.",
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
    await prisma.appointmentSession.create({
      data: {
        ...validatedFields.data,
        image: imageUrl,
        userId: session.user.id,
        eventId: eventId,
      },
    });
  } catch (error) {
    return { message: "Database error: Unable to create Appointment Session." };
  }

  revalidatePath(`/events/${eventId}/appointmentSessions`);
  redirect(`/events/${eventId}/appointmentSessions`);
}
