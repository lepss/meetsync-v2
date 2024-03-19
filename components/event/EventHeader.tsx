import { formatDate } from "@/lib/date";
import Image from "next/image";
import { Button } from "../ui/button";

export const EventHeader = ({
  image,
  date,
  location,
  name,
}: {
  image: string | null;
  date: Date;
  location: string;
  name: string;
}) => {
  return (
    <div className="justify-center mx-auto">
      <div className="relative w-full h-auto" style={{ height: "400px" }}>
        {image ? (
          <Image
            src={image}
            alt="event image"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            className="rounded-lg m-auto"
            priority={true}
          />
        ) : null}
      </div>
      <div className="divide-y divide-muted">
        <div className="py-4">
          <p className="font-bold text-lg uppercase">
            {formatDate(date, "long", "en-US")}
          </p>
          <h2 className="font-bold text-3xl capitalize">{name}</h2>
          <p className="text-lg mt-1 text-muted-foreground">{location}</p>
        </div>
        <div className="flex gap-2">
          <Button className="py-2 px-4 w-full mt-4">Create a session</Button>
          <Button className="py-2 px-4 w-full mt-4">Join a session</Button>
        </div>
      </div>
    </div>
  );
};
