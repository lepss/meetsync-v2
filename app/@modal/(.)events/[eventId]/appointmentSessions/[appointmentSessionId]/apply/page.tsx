import { AppointmentRequestFormModal } from "@/components/appointmentRequest/appointmentRequestFormModal";

export default async function Page({
  params,
}: {
  params: { eventId: string; appointmentSessionId: string };
}) {
  return (
    <AppointmentRequestFormModal
      eventId={params.eventId}
      appointmentSessionId={params.appointmentSessionId}
    />
  );
}
