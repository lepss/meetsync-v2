import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const appointmentSessionCardQuery = () =>
  ({
    id: true,
    name: true,
    description: true,
    image: true,
    created_at: true,
    user: {
      select: {
        id: true,
        username: true,
        name: true,
        image: true,
      },
    },
    event: {
      select: {
        name: true,
        location: true,
        id: true,
      },
    },
    _count: {
      select: {
        appointmentRequests: true,
      },
    },
  } satisfies Prisma.AppointmentSessionSelect);

export const appointmentSessionQuery = () =>
  ({
    id: true,
    name: true,
    description: true,
    image: true,
    created_at: true,
    user: {
      select: {
        id: true,
        username: true,
        name: true,
        image: true,
      },
    },
    event: {
      select: {
        name: true,
        location: true,
        id: true,
        eventDays: {
          select: {
            id: true,
            start_time: true,
            end_time: true,
          },
        },
      },
    },
    appointmentRequests: {
      select: {
        id: true,
        request: true,
        accepted_status: true,
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
    },
    _count: {
      select: {
        appointmentRequests: true,
      },
    },
  } satisfies Prisma.AppointmentSessionSelect);

export const getLatestAppointmentSessions = async () =>
  prisma.appointmentSession.findMany({
    select: appointmentSessionCardQuery(),
    orderBy: {
      created_at: "desc",
    },
    take: 5,
  });

export const getLatestAppointmentSessionsByEventId = async (eventId: string) =>
  prisma.appointmentSession.findMany({
    where: { eventId },
    select: appointmentSessionCardQuery(),
    orderBy: {
      created_at: "desc",
    },
    take: 5,
  });

export const getAllAppointmentSessions = async () =>
  prisma.appointmentSession.findMany({
    select: appointmentSessionCardQuery(),
  });

export const getAllAppointmentSessionsByEventId = async (eventId: string) =>
  prisma.appointmentSession.findMany({
    where: { eventId },
    select: appointmentSessionCardQuery(),
  });

export const getAppointmentSessionById = async (id: string) =>
  prisma.appointmentSession.findUnique({
    where: { id },
    select: appointmentSessionQuery(),
  });

export const getAppointmentSessionCount = async () =>
  prisma.appointmentSession.count();

export const getAppointmentSessionCountByEventId = async (eventId: string) =>
  prisma.appointmentSession.count({
    where: { eventId },
  });

export type AppointmentSessionCardType = Prisma.PromiseReturnType<
  typeof getAllAppointmentSessionsByEventId
>[number];

export type AppointmentSessionType = Prisma.PromiseReturnType<
  typeof getAppointmentSessionById
>;
