"use client";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";

export const Search = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }
      replace(`${pathname}?${params.toString()}`);
      // console.log(params.toString());
    }
  }, 300);

  return (
    <div>
      <div className="relative mt-2 flex flex-1 shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <Input
          className="peer block w-full rounded-md border border-secondary py-[9px] pl-10 text-sm placeholder:text-muted-foreground"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams?.get("query")?.toString()}
        />
        <SearchIcon className="absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground peer-focus:text-foreground" />
      </div>
    </div>
  );
};
