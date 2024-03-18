import { Event } from "@/prisma/query/event.query";
import clsx from "clsx";
import { PropsWithChildren } from "react";

type EventLayoutProps = PropsWithChildren<{
  eventDay?: Event["eventDays"];
  eventId?: string;
  className?: string;
  sessionCount: number;
  user: Event["user"];
  location: string;
}>;

export const EventLayout = ({
  className,
  eventId,
  eventDay,
  sessionCount,
  user,
  location,
  children,
}: EventLayoutProps) => {
  return (
    <div className={clsx("", className)}>
      {children}
      <h1>EventLayout</h1>
    </div>
  );
};
