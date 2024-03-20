import { AppointmentSessionContent } from "@/components/appointmentSession/AppointmentSessionContent";
import { AppointmentSessionHeader } from "@/components/appointmentSession/AppointmentSessionHeader";
import { getAppointmentSessionById } from "@/prisma/query/appointmentSession.query";
import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: { eventId: string; appointmentSessionId: string };
}) {
  const appointmentSession = await getAppointmentSessionById(
    params.appointmentSessionId
  );

  if (!appointmentSession) {
    notFound();
  }
  return (
    <div className="mt-4 max-w-screen-xl gap-2">
      <AppointmentSessionHeader
        image={appointmentSession.image}
        date={appointmentSession.event.eventDays[0].start_time}
        location={appointmentSession.event.location}
        name={appointmentSession.name}
        id={appointmentSession.id}
      />
      <AppointmentSessionContent
        className=""
        appointmentSession={appointmentSession}
      />
    </div>
  );
}
