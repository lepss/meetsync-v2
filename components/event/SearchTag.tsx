"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tags } from "@/lib/queries/tag.query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const SearchTag = ({ tags }: { tags: Tags }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      if (term) {
        params.set("tag", term);
      } else {
        params.delete("tag");
      }
      replace(`${pathname}?${params.toString()}`);
    }
  };
  const debouncedSearch = useDebouncedCallback(handleSearch, 300);

  // Gérer le changement de chaque checkbox
  const handleTagChange = (tagName: string) => {
    setSelectedTags((prevSelectedTags) => {
      const newSelectedTags = prevSelectedTags.includes(tagName)
        ? prevSelectedTags.filter((name) => name !== tagName)
        : [...prevSelectedTags, tagName];

      return newSelectedTags;
    });
  };

  useEffect(() => {
    debouncedSearch(selectedTags.join(" "));
  }, [debouncedSearch, selectedTags]);

  return (
    <Accordion type="single" collapsible className="mt-4">
      <AccordionItem value="tags">
        <AccordionTrigger className="font-bold">Categories</AccordionTrigger>
        <AccordionContent>
          <div className="mt-2 flex w-full flex-col gap-2">
            {tags.map((tag) => (
              <label key={tag.id} className="capitalize">
                <input
                  type="checkbox"
                  id={tag.id}
                  checked={selectedTags.includes(tag.name)}
                  onChange={() => handleTagChange(tag.name)}
                />{" "}
                {tag.name + " (" + tag._count.tagRelation + ")"}
              </label>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
