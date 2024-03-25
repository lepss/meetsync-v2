import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { cache } from "react";

const userQuery = {
  id: true,
  name: true,
  firstname: true,
  lastname: true,
  image: true,
  username: true,
  createdAt: true,
  bio: true,
  link: true,
} satisfies Prisma.UserSelect;

export const getUser = async () => {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    throw new Error("User not found");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  return user;
};

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    select: userQuery,
  });

  return users;
};

export const getUserProfile = cache(async (userId: string) => {
  const user = await prisma.user.findFirst({
    where: { OR: [{ username: userId }, { id: userId }] },
    select: {
      ...userQuery,
      _count: {
        select: {
          events: true,
          appointmentRequests: true,
          appointmentSessions: true,
        },
      },
    },
  });

  return user;
});

export const getUserEdit = async () => {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("No session");
  }

  return prisma.user.findFirstOrThrow({
    where: {
      id: session?.user?.id,
    },
    select: userQuery,
  });
};

export const getUserNumber = async () => prisma.user.count();

export type UserProfile = NonNullable<
  Prisma.PromiseReturnType<typeof getUserProfile>
>;

export type UserEdit = NonNullable<
  Prisma.PromiseReturnType<typeof getUserEdit>
>;
