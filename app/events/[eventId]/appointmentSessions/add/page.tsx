import { AppointmentSessionForm } from "@/components/appointmentSession/AppointmentSessionForm";
import { createAppointmentSession } from "./create-session.action";

export default async function AddAppointmentSessionPage({
  params,
}: {
  params: { eventId: string };
}) {
  return (
    <div className="container mt-20 flex h-full items-center">
      <div className="flex-1 rounded-md border border-border bg-card p-4">
        <AppointmentSessionForm
          onSubmit={async (values) => {
            "use server";
            await createAppointmentSession(values, params.eventId);
          }}
        />
      </div>
    </div>
  );
}
