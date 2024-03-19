import { EventContent } from "@/components/event/EventContent";
import { EventHeader } from "@/components/event/EventHeader";
import { getEventById } from "@/prisma/query/event.query";
import { notFound } from "next/navigation";

export default async function EventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const event = await getEventById(params.eventId);

  if (!event) {
    notFound();
  }

  return (
    <div className="gap-2 mt-4 max-w-screen-xl">
      <EventHeader
        image={event.image}
        date={event.eventDays[0].start_time}
        location={event.location}
        name={event.name}
      />
      <EventContent className="" event={event} />
    </div>
  );
}
