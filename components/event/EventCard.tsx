import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Event } from "@/prisma/query/event.query";
import { CalendarDays, Handshake, MapPin } from "lucide-react";
import Link from "next/link";

type EventCardProps = { event: Event };

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link href={`/event/${event.id}`}>
      <Card className="w-full p-4 mt-4">
        <CardHeader>
          <CardTitle>{event.name}</CardTitle>
          <CardDescription className="flex items-center gap-2 py-1">
            <Avatar>
              {event.user.image ? (
                <AvatarImage src={event.user.image} alt={event.user.username} />
              ) : null}
              <AvatarFallback>
                {event.user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {event.user.username}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{event.description}</p>
        </CardContent>
        <CardFooter className="gap-1">
          <MapPin size={16} />
          <p>{event.location}</p>
          <CalendarDays size={16} className="ml-4" />
          <p>{event.eventDays[0].start_time.toDateString()}</p>
          <Handshake size={16} className="ml-4" />
          <p>{event.appointmentSessions.length} Peoples to meet</p>
        </CardFooter>
      </Card>
    </Link>
  );
};
