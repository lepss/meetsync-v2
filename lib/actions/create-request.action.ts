"use server";

import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getSessionEventIdBySessionId } from "../queries/appointmentSession.query";

const FormSchema = z.object({
  request: z
    .string({ invalid_type_error: "Please enter a valid request" })
    .min(10, { message: "Request should be greater than 10 charaters" })
    .max(500, { message: "Request should be less than 50 charaters" }),
});

const CreateAppointmentRequest = FormSchema.omit({});
const UpdateAppointmentRequest = FormSchema.omit({});

export type State = {
  errors?: {
    request?: string[];
  };
  message?: string | null;
};

export async function createAppointmentRequest(
  appointmentSessionId: string,
  prevState: State,
  formData: FormData
) {
  const session = await getAuthSession();
  if (!session || !session.user || !session.user.id) {
    throw new Error("You must be logged in to create request");
  }

  const validatedFields = CreateAppointmentRequest.safeParse({
    request: formData.get("request"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create create.",
    };
  }

  const eventId = await getSessionEventIdBySessionId(appointmentSessionId);

  try {
    await prisma.appointmentRequest.create({
      data: {
        ...validatedFields.data,
        userId: session.user.id,
        appointmentSessionId: appointmentSessionId,
      },
    });
  } catch (error) {
    return { message: "Database error: Unable to create Appointment Request." };
  }

  revalidatePath(
    `/events/${eventId}/appointmentSessions/${appointmentSessionId}`
  );
  redirect(`/events/${eventId}/appointmentSessions/${appointmentSessionId}`);
}
