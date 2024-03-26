import { EventsList } from "@/components/event/EventsList";
import { Pagination } from "@/components/event/Pagination";
import { getEventsPages, getFilteredEvents } from "@/lib/queries/event.query";
import { Suspense } from "react";

export default async function Events({
  searchParams,
}: {
  searchParams?: { query?: string; tag?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const tag = searchParams?.tag || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getEventsPages(query, tag);

  // const session = await getAuthSession();
  const events = await getFilteredEvents(query, tag, currentPage);

  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="grow pt-12">
        <Suspense fallback={<div>Loading...</div>}>
          <EventsList query={query} tag={tag} currentPage={currentPage} />
        </Suspense>
      </div>
      <div className="m-auto flex w-full justify-center py-8">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
