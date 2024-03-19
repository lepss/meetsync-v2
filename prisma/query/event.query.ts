import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const eventCardQuery = () =>
  ({
    id: true,
    name: true,
    description: true,
    location: true,
    created_at: true,
    image: true,
    user: {
      select: {
        image: true,
        username: true,
        id: true,
      },
    },
    eventDays: {
      select: {
        id: true,
        start_time: true,
        end_time: true,
      },
    },
    _count: {
      select: {
        appointmentSessions: true,
      },
    },
  } satisfies Prisma.EventSelect);

export const eventQuery = () =>
  ({
    id: true,
    name: true,
    description: true,
    location: true,
    appointment_duration: true,
    break_duration: true,
    created_at: true,
    image: true,
    user: {
      select: {
        image: true,
        username: true,
        id: true,
      },
    },
    eventDays: {
      select: {
        id: true,
        start_time: true,
        end_time: true,
        lunch_start_time: true,
        lunch_end_time: true,
      },
    },
    appointmentSessions: {
      select: {
        id: true,
        description: true,
        user: {
          select: {
            id: true,
            image: true,
            username: true,
          },
        },
      },
    },
  } satisfies Prisma.EventSelect);

export const getLatestEvents = async () =>
  prisma.event.findMany({
    select: eventCardQuery(),
    orderBy: { created_at: "desc" },
    take: 10,
  });

export const getEventById = async (id: string) =>
  prisma.event.findUnique({
    where: { id },
    select: eventQuery(),
  });

export const getAllEvents = async () =>
  prisma.event.findMany({
    select: eventCardQuery(),
  });

export const getEventNumber = async () => prisma.event.count();

export type EventCardType = Prisma.PromiseReturnType<
  typeof getLatestEvents
>[number];

export type EventType = Prisma.PromiseReturnType<typeof getEventById>;
