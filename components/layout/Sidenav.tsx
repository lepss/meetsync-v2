import { getTags } from "@/lib/queries/tag.query";
import { Search } from "../event/Search";
import { SearchTag } from "../event/SearchTag";

export default async function SideNav() {
  const tags = await getTags();
  return (
    <div className="flex h-full flex-col border-b px-3 py-4 md:border-r md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 px-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="w-full">
          <h2 className="mt-16 text-xl font-bold">Events</h2>
          <div>
            <Search placeholder="Search events" />
            <SearchTag tags={tags} />
          </div>
        </div>
        {/* <NavLinks /> */}
        {/* <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div> */}
      </div>
    </div>
  );
}
