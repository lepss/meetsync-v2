import { getFilteredEvents } from "@/lib/queries/event.query";
import { EventCard } from "./EventCard";

export const EventsList = async ({
  query,
  tag,
  currentPage,
}: {
  query: string;
  tag: string;
  currentPage: number;
}) => {
  const events = await getFilteredEvents(query, tag, currentPage);
  return (
    <div className="m-auto mt-4 flex flex-wrap justify-center gap-2">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
