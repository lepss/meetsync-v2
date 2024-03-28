import { EventForm } from "@/components/event/EventForm";

export default function CreateEventPage() {
  return (
    <div className="container mt-20 flex h-full items-center">
      <div className="flex-1 rounded-md border border-border bg-card p-4">
        <EventForm />
      </div>
    </div>
  );
}
