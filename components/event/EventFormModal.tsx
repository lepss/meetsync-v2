"use client";

import { Tags } from "@/lib/queries/tag.query";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent } from "../ui/dialog";
import { EventForm } from "./EventForm";

export const EventFormModal = ({ tagList }: { tagList: Tags }) => {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);

  return (
    <Dialog
      open={pathname?.includes("events/create")}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <EventForm tagList={tagList} />
      </DialogContent>
    </Dialog>
  );
};
