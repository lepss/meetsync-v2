import { AppointmentSessionCard } from "@/components/appointmentSession/AppointmentSessionCard";
import { getAuthSession } from "@/lib/auth";
import { getAllAppointmentSessionsByEventId } from "@/prisma/query/appointmentSession.query";

type PageParams = {
  params: {
    eventId: string;
  };
};

export default async function AppointmentSessions({ params }: PageParams) {
  const session = await getAuthSession();
  const appointmentSessions = await getAllAppointmentSessionsByEventId(
    params.eventId
  );
  return (
    <div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {appointmentSessions.map((appointmentSession) => (
          <AppointmentSessionCard
            key={appointmentSession.id}
            appointmentSession={appointmentSession}
          />
        ))}
      </div>
    </div>
  );
}
