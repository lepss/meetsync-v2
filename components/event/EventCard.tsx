import { formatDate } from "@/lib/date";
import { EventCardType } from "@/prisma/query/event.query";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

type EventCardProps = { event: EventCardType };

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link
      href={`/event/${event.id}`}
      className="rounded-lg overflow-hidden w-96 hover:bg-muted"
    >
      <div className="h-48 bg-cover bg-center relative">
        {event.image ? (
          <Image
            src={event.image}
            alt="event image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "cover",
            }}
          />
        ) : null}
      </div>
      <div className="py-4 px-1">
        <p className="text-sm uppercase">
          {formatDate(event.eventDays[0].start_time, "short", "en-US")}
        </p>
        <h2 className="text-xl font-bold uppercase mt-1 truncate whitespace-nowrap overflow-hidden">
          {event.name}
        </h2>
        <p className="mt-1 font-bold text-muted-foreground">{event.location}</p>
        <p className="text-sm mt-1 text-muted-foreground">
          {event._count.appointmentSessions} people to meet
        </p>
      </div>
      <div className="pb-1 px-1">
        <Button className="py-2 px-4 w-full" variant="default">
          Join
        </Button>
      </div>
    </Link>
  );
};
