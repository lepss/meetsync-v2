import { formatDate } from "@/lib/utils/date";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export const EventHeader = ({
  image,
  date,
  location,
  name,
  id,
}: {
  image: string | null;
  date: Date;
  location: string;
  name: string;
  id: string;
}) => {
  return (
    <div className="mx-auto justify-center">
      <div className="relative h-auto w-full" style={{ height: "400px" }}>
        {image ? (
          <Image
            src={image}
            alt="event image"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            className="m-auto rounded-lg"
            priority={true}
          />
        ) : null}
      </div>
      <div className="divide-y divide-muted">
        <div className="py-4">
          <p className="text-lg font-bold uppercase">
            {formatDate(date, "long", "en-US")}
          </p>
          <h2 className="text-3xl font-bold capitalize">{name}</h2>
          <p className="mt-1 text-lg text-muted-foreground">{location}</p>
        </div>
        <div className="flex gap-2">
          <Link
            className="w-full"
            href={`/events/${id}/appointmentSessions/create`}
          >
            <Button className="mt-4 w-full px-4 py-2">Create a session</Button>
          </Link>
          <Link className="w-full" href={`/events/${id}/appointmentSessions`}>
            <Button className="mt-4 w-full px-4 py-2">Join a session</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
