import { EventFormModal } from "@/components/event/EventFormModal";
import { getTags } from "@/lib/queries/tag.query";

export default async function Page() {
  const tags = await getTags();

  return <EventFormModal tagList={tags} />;
}
