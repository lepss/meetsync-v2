import { EventCardType } from "@/lib/queries/event.query";
import { formatDate } from "@/lib/utils/date";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

type EventCardProps = { event: EventCardType };

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link
      href={`/events/${event.id}`}
      className="w-96 overflow-hidden rounded-lg hover:bg-muted"
    >
      <div className="relative h-48 bg-cover bg-center">
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
      <div className="px-1 py-4">
        <p className="text-sm uppercase">
          {formatDate(event.eventDays[0].start_time, "short", "en-US")}
        </p>
        <h2 className="mt-1 overflow-hidden truncate whitespace-nowrap text-xl font-bold uppercase">
          {event.name}
        </h2>
        <p className="mt-1 font-bold text-muted-foreground">{event.location}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {event._count.appointmentSessions} people to meet
        </p>
      </div>
      <div className="px-1 pb-1">
        <Button className="w-full px-4 py-2" variant="default">
          Join
        </Button>
      </div>
    </Link>
  );
};
