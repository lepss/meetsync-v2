"use client";

import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent } from "../ui/dialog";
import { AppointmentRequestForm } from "./appointmentRequestForm";

export const AppointmentRequestFormModal = ({
  eventId,
  appointmentSessionId,
}: {
  eventId: string;
  appointmentSessionId: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Dialog
      // open={pathname?.includes("appointmentSessions/create")}
      open={true}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <AppointmentRequestForm
          eventId={eventId}
          appointmentSessionId={appointmentSessionId}
        />
      </DialogContent>
    </Dialog>
  );
};
