import { AppointmentRequestForm } from "@/components/appointmentRequest/appointmentRequestForm";

export default function page({
  params,
}: {
  params: { eventId: string; appointmentSessionId: string };
}) {
  return (
    <div className="container mt-20 flex h-full items-center">
      <div className="flex-1 rounded-md border border-border bg-card p-4">
        <AppointmentRequestForm
          eventId={params.eventId}
          appointmentSessionId={params.appointmentSessionId}
        />
      </div>
    </div>
  );
}
