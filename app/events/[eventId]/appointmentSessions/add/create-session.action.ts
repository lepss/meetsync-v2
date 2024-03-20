"use server";

import { AppointmentSessionFormType } from "@/components/appointmentSession/AppointmentSessionForm";
import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const createAppointmentSession = async (
  values: AppointmentSessionFormType,
  eventId: string
) => {
  const session = await getAuthSession();
  if (!session || !session.user || !session.user.id) {
    throw new Error("You must be logged in to create an appointment session");
  }

  await prisma.appointmentSession.create({
    data: {
      ...values,
      eventId: eventId,
      userId: session.user.id,
    },
  });

  redirect(`/events/${eventId}/appointmentSessions`);
};
