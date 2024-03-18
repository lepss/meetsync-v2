import { EventCard } from "@/components/event/EventCard";
import { getAuthSession } from "@/lib/auth";
import { getLatestEvents } from "@/prisma/query/event.query";

export default async function Events() {
  const session = await getAuthSession();
  const events = await getLatestEvents();

  return (
    <main>
      <div className="divide-y">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}
