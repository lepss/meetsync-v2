import {
  BellDot,
  CalendarDays,
  Clock,
  MapPin,
  User2,
  Users2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EventType } from "@/lib/queries/event.query";
import { formatDate } from "@/lib/utils/date";
import { cn } from "@/lib/utils/utils";
import Link from "next/link";

export const EventContent = ({
  className,
  event,
}: {
  className: string;
  event: EventType;
}) => {
  return (
    <Card className={cn("mt-4", className)}>
      <CardHeader>
        <CardTitle>About</CardTitle>
        <CardDescription className="text-base">
          {event?.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex">
          <Users2 />
          <p className="ml-2">
            {event?.appointmentSessions.length} meeting sessions to join
          </p>
        </div>
        <div className="flex">
          <User2 />
          <p className="ml-2">
            Event organize by{" "}
            <Link href={`/user/${event?.user.id}`} className="hover:underline">
              {event?.user.username}
            </Link>
          </p>
        </div>
        <div className="flex">
          <MapPin />
          <p className="ml-2">{event?.location}</p>
        </div>
        <div className="flex">
          <CalendarDays />
          {event?.eventDays.length !== undefined ? (
            event?.eventDays.length > 1 ? (
              <p className="ml-2">
                From{" "}
                {formatDate(event.eventDays[0].start_time, "long", "en-US")} to{" "}
                {formatDate(
                  event.eventDays[event.eventDays.length - 1].end_time,
                  "long",
                  "en-US"
                )}
              </p>
            ) : (
              <p className="ml-2">
                {formatDate(event.eventDays[0].start_time, "long", "en-US")}
              </p>
            )
          ) : (
            <p className="ml-2">No dates found</p>
          )}
        </div>
        <div className="flex">
          <Clock />
          <p className="ml-2">
            Appointment duration : {event?.appointment_duration} min
          </p>
        </div>
        <div className="flex">
          <BellDot />
          <p className="ml-2">Breack duration : {event?.break_duration} min</p>
        </div>
      </CardContent>
      <CardFooter>
        <p className="w-full text-right text-sm text-muted-foreground">
          Created at {event?.created_at.toLocaleDateString("en-US")}
        </p>
      </CardFooter>
    </Card>
  );
};
