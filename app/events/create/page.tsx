import { EventForm } from "@/components/event/EventForm";
import { getTags } from "@/lib/queries/tag.query";

export default async function CreateEventPage() {
  const tags = await getTags();
  return (
    <div className="container mt-20 flex h-full items-center">
      <div className="flex-1 rounded-md border border-border bg-card p-4">
        <EventForm tagList={tags} />
      </div>
    </div>
  );
}
