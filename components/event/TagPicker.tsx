"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tags } from "@/lib/queries/tag.query";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";

interface Tag {
  id: string;
  name: string;
}

export type TagStateType = {
  [key: string]: { selected: boolean; name: string };
};

export function TagPicker({
  tagList,
  onSelectedTagsChange,
}: {
  tagList: Tags;
  onSelectedTagsChange: (selectedTagsId: String[]) => void;
}) {
  const [selectedTags, setSelectedTags] = useState<TagStateType>(
    tagList.reduce((acc, tag) => {
      acc[tag.id] = { selected: false, name: tag.name };
      return acc;
    }, {} as { [key: string]: { selected: boolean; name: string } })
  );

  const handleTagChange = (tagId: string, tagName: string) => {
    const newSelectedTags = {
      ...selectedTags,
      [tagId]: {
        ...selectedTags[tagId],
        selected: !selectedTags[tagId].selected,
      },
    };
    setSelectedTags(newSelectedTags);

    const selectedTagIds = Object.entries(newSelectedTags)
      .filter(([_, tagInfo]) => tagInfo.selected)
      .map(([id, _]) => id);

    onSelectedTagsChange(selectedTagIds);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Select tag</Button>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <ScrollArea className="h-72 w-full rounded-md">
            <div className="flex flex-col items-start gap-1 ">
              {tagList.map((tag) => (
                <div key={tag.id} className="flex flex-row gap-2">
                  <Checkbox
                    id={tag.id.toString()}
                    checked={selectedTags[tag.id].selected}
                    onCheckedChange={() => handleTagChange(tag.id, tag.name)}
                    className="m-auto"
                  ></Checkbox>
                  <label htmlFor={tag.id.toString()} className="capitalize">
                    {tag.name}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.entries(selectedTags)
          .filter(([_, tagInfo]) => tagInfo.selected)
          .map(([id, tagInfo]) => (
            <Badge key={id}>{tagInfo.name}</Badge>
          ))}
      </div>
    </div>
  );
}
