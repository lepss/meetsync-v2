import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";
import { LoginButton } from "./auth/AuthButton";
import { UserProfile } from "./auth/UserProfile";

export const Header = async () => {
  const session = await getAuthSession();
  return (
    <header className="fixed top-0 z-20 w-full border-b border-b-accent bg-background">
      <div className="container m-auto flex max-w-screen-xl items-center justify-between gap-1 py-2">
        <Link href="/">
          <h2 className="mr-auto text-2xl font-bold">Meetsync</h2>
        </Link>
        {/* <HeaderNavigationMenu /> */}
        <div className="flex items-center gap-2">
          {session?.user ? <UserProfile /> : <LoginButton />}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
