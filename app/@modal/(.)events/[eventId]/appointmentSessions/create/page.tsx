import { AppointmentSessionFormModal } from "@/components/appointmentSession/AppointmentSessionFormModal";

export default async function Page({
  params,
}: {
  params: { eventId: string };
}) {
  return <AppointmentSessionFormModal eventId={params.eventId} />;
}
