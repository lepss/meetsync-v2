import {
  BellDot,
  CalendarDays,
  Clock,
  MapPin,
  User2,
  Users2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { AppointmentSessionType } from "@/prisma/query/appointmentSession.query";

export const AppointmentSessionContent = ({
  className,
  appointmentSession,
}: {
  className: string;
  appointmentSession: AppointmentSessionType;
}) => {
  return (
    <Card className={cn("mt-4", className)}>
      <CardHeader>
        <CardTitle>About</CardTitle>
        <CardDescription className="text-base">
          {appointmentSession?.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex">
          <Users2 />
          <p className="ml-2">
            {appointmentSession?._count.appointmentRequests} persons have
            already join this session
          </p>
        </div>
        <div className="flex">
          <User2 />
          <p className="ml-2">
            Session organize by{" "}
            <Link
              href={`/user/${appointmentSession?.user.id}`}
              className="hover:underline"
            >
              {appointmentSession?.user.username}
            </Link>
          </p>
        </div>
        <div className="flex">
          <MapPin />
          <p className="ml-2">{appointmentSession?.event?.location}</p>
        </div>
        <div className="flex">
          <CalendarDays />
          {appointmentSession?.event?.eventDays.length !== undefined ? (
            appointmentSession?.event?.eventDays.length > 1 ? (
              <p className="ml-2">
                From{" "}
                {formatDate(
                  appointmentSession?.event.eventDays[0].start_time,
                  "long",
                  "en-US"
                )}{" "}
                to{" "}
                {formatDate(
                  appointmentSession?.event.eventDays[
                    appointmentSession?.event.eventDays.length - 1
                  ].end_time,
                  "long",
                  "en-US"
                )}
              </p>
            ) : (
              <p className="ml-2">
                {formatDate(
                  appointmentSession?.event.eventDays[0].start_time,
                  "long",
                  "en-US"
                )}
              </p>
            )
          ) : (
            <p className="ml-2">No dates found</p>
          )}
        </div>
        <div className="flex">
          <Clock />
          <p className="ml-2">
            Appointment duration :{" "}
            {appointmentSession?.event?.appointment_duration} min
          </p>
        </div>
        <div className="flex">
          <BellDot />
          <p className="ml-2">
            Breack duration : {appointmentSession?.event?.break_duration} min
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <p className="w-full text-right text-sm text-muted-foreground">
          Created at{" "}
          {appointmentSession?.created_at.toLocaleDateString("en-US")}
        </p>
      </CardFooter>
    </Card>
  );
};
