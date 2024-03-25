import { getLatestEvents } from "@/lib/queries/event.query";
import { formatDate } from "@/lib/utils/date";
import clsx from "clsx";
import { RefreshCcwIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const LatestEvent = async () => {
  const latestEvents = await getLatestEvents();

  return (
    <div className="mt-4 flex w-full flex-col md:col-span-4 lg:w-1/2">
      <h2 className={`mb-2 text-xl font-bold md:text-2xl`}>Latest Events</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-border p-4">
        <div className="bg-card">
          {latestEvents.map((event, i) => {
            return (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className={clsx(
                  "flex flex-col justify-between p-4 hover:bg-muted",
                  {
                    "border-t": i !== 0,
                  }
                )}
              >
                <div className="flex">
                  <div className="relative mr-4 hidden h-24 w-36 shrink-0 overflow-hidden rounded-md sm:block">
                    {event.image ? (
                      <Image
                        src={event.image}
                        alt="event image"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm uppercase">
                      {formatDate(
                        event.eventDays[0].start_time,
                        "short",
                        "en-US"
                      )}
                    </p>
                    <p className="truncate text-sm font-semibold md:text-base">
                      {event.name}
                    </p>
                    <p className="hidden truncate text-sm text-muted-foreground sm:block">
                      {event.description}
                    </p>
                    <p className={`truncate text-sm font-medium md:text-base`}>
                      {event.location}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <RefreshCcwIcon className="size-5 text-muted-foreground" />
          <h3 className="ml-2 text-sm text-muted-foreground ">
            Updated just now
          </h3>
        </div>
      </div>
    </div>
  );
};
