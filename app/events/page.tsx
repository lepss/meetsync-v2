import { EventCard } from "@/components/event/EventCard";
import { getAuthSession } from "@/lib/auth";
import { getAllEvents } from "@/prisma/query/event.query";

export default async function Events() {
  const session = await getAuthSession();
  const events = await getAllEvents();

  return (
    <main>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}