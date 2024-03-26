import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";

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
    tags: {
      select: {
        tag: {
          select: {
            name: true,
          },
        },
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
    select: {
      id: true,
      name: true,
      description: true,
      location: true,
      image: true,
      created_at: true,
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
    },
    orderBy: { created_at: "desc" },
    take: 5,
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

const ITEMS_PER_PAGE = 8;
export const getFilteredEvents = async (
  query: string,
  tag: string,
  currentPage: number
) => {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const tagsArray = tag.split(" ");
  return prisma.event.findMany({
    select: eventCardQuery(),
    where: {
      OR: [
        {
          name: {
            contains: query,
          },
        },
        {
          description: {
            contains: query,
          },
        },
        {
          location: {
            contains: query,
          },
        },
        {
          tags: {
            some: {
              tag: {
                name: {
                  in: tagsArray,
                },
              },
            },
          },
        },
      ],
      tags: tag
        ? {
            some: {
              tag: {
                name: {
                  in: tagsArray,
                },
              },
            },
          }
        : undefined,
    },
    orderBy: {
      created_at: "desc",
    },
    skip: offset,
    take: ITEMS_PER_PAGE,
  });
};

export const getEventsPages = async (query: string, tag: string) => {
  noStore();
  const tagsArray = tag.split(" ");
  try {
    const totalEvents = await prisma.event.count({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
          {
            location: {
              contains: query,
            },
          },
          {
            tags: {
              some: {
                tag: {
                  name: {
                    in: tagsArray,
                  },
                },
              },
            },
          },
        ],
        tags: tag
          ? {
              some: {
                tag: {
                  name: {
                    in: tagsArray,
                  },
                },
              },
            }
          : undefined,
      },
    });

    return Math.ceil(totalEvents / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of events.");
  }
};

export const getEventCount = async () => prisma.event.count();

export type EventCardType = Prisma.PromiseReturnType<
  typeof getAllEvents
>[number];

export type EventType = Prisma.PromiseReturnType<typeof getEventById>;
