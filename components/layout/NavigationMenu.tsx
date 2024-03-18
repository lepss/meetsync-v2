import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import clsx from "clsx";
import Link from "next/link";

export const HeaderNavigationMenu = async () => {
  const session = await getAuthSession();
  return (
    <div className=" flex container gap-1 bg-background max-w-lg">
      <Link
        href="/events"
        className={clsx(
          buttonVariants({
            variant: "ghost",
          }),
          "flex-1"
        )}
      >
        {/* <Home size={16} /> */}
        Events
      </Link>
      {session?.user && (
        <Link
          href="/dashboard"
          className={clsx(
            buttonVariants({
              variant: "ghost",
            }),
            "flex-1"
          )}
        >
          {/* <PenSquare size={16} /> */}
          Dashboard
        </Link>
      )}
    </div>
  );
};
