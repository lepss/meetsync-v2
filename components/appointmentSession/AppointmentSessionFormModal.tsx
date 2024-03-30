"use client";

import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent } from "../ui/dialog";
import { AppointmentSessionForm } from "./AppointmentSessionForm";

export const AppointmentSessionFormModal = ({
  eventId,
}: {
  eventId: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Dialog
      open={pathname?.includes("appointmentSessions/create")}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <AppointmentSessionForm eventId={eventId} />
      </DialogContent>
    </Dialog>
  );
};
