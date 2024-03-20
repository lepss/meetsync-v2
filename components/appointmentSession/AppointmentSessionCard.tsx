import { AppointmentSessionCardType } from "@/prisma/query/appointmentSession.query";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

type AppointmentSessionCardProps = {
  appointmentSession: AppointmentSessionCardType;
};

export const AppointmentSessionCard = ({
  appointmentSession,
}: AppointmentSessionCardProps) => {
  return (
    <Link
      href={`/appoinmentSession/${appointmentSession.id}`}
      className="w-96 overflow-hidden rounded-lg hover:bg-muted"
    >
      <div className="relative h-48 bg-cover bg-center">
        {appointmentSession.image ? (
          <Image
            src={appointmentSession.image}
            alt="appointment session image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "cover",
            }}
          />
        ) : null}
      </div>
      <div className="px-1 py-4">
        <h2 className="mt-1 overflow-hidden truncate whitespace-nowrap text-xl font-bold uppercase">
          {appointmentSession.name}
        </h2>
        <p className="mt-1 font-bold text-muted-foreground">
          {appointmentSession.user.name}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {appointmentSession._count.appointmentRequests} people have already
          requested this sessions
        </p>
      </div>
      <div className="px-1 pb-1">
        <Button className="w-full px-4 py-2" variant="default">
          Apply
        </Button>
      </div>
    </Link>
  );
};
