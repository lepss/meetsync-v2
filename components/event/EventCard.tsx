import { Event } from "@/prisma/query/event.query";
import Image from "next/image";

type EventCardProps = { event: Event };

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="rounded-lg overflow-hidden w-96">
      <div className="h-48 bg-cover bg-center">
        {event.image ? (
          <Image
            src={event.image}
            alt="event image"
            layout="fill"
            objectFit="cover"
          />
        ) : null}
      </div>
      <div className="p-4">
        <p className=""></p>
      </div>
    </div>

    // <Link href={`/event/${event.id}`}>
    //   <Card className="w-full p-4 mt-4">
    //     <CardHeader>
    //       <CardTitle>{event.name}</CardTitle>
    //       <CardDescription className="flex items-center gap-2 py-1">
    //         <Avatar>
    //           {event.user.image ? (
    //             <AvatarImage src={event.user.image} alt={event.user.username} />
    //           ) : null}
    //           <AvatarFallback>
    //             {event.user.username.slice(0, 2).toUpperCase()}
    //           </AvatarFallback>
    //         </Avatar>
    //         {event.user.username}
    //       </CardDescription>
    //     </CardHeader>
    //     <CardContent>
    //       <p>{event.description}</p>
    //     </CardContent>
    //     <CardFooter className="gap-1">
    //       <MapPin size={16} />
    //       <p>{event.location}</p>
    //       <CalendarDays size={16} className="ml-4" />
    //       <p>{event.eventDays[0].start_time.toDateString()}</p>
    //       <Handshake size={16} className="ml-4" />
    //       <p>{event._count.appointmentSessions} Peoples to meet</p>
    //     </CardFooter>
    //   </Card>
    // </Link>
  );
};
