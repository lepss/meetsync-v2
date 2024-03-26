import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getTags = async () => {
  const tags = await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
      _count: { select: { tagRelation: true } },
    },
  });

  return tags;
};

export type Tags = NonNullable<Prisma.PromiseReturnType<typeof getTags>>;
