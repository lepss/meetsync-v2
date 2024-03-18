import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";
import { HeaderNavigationMenu } from "./NavigationMenu";
import { LoginButton } from "./auth/AuthButton";
import { UserProfile } from "./auth/UserProfile";

export const Header = async () => {
  const session = await getAuthSession();
  return (
    <header className="border-b border-b-accent fixed z-20 top-0 bg-background w-full">
      <div className="container flex items-center py-2 max-w-screen-xl m-auto gap-1">
        <Link href="/">
          <h2 className="text-2xl font-bold mr-auto">Meetsync</h2>
        </Link>
        <HeaderNavigationMenu />
        {session?.user ? <UserProfile /> : <LoginButton />}
        <ThemeToggle />
      </div>
    </header>
  );
};
