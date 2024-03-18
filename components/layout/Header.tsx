import { getAuthSession } from "@/lib/auth";
import { ThemeToggle } from "../theme/ThemeToggle";
import { LoginButton } from "./auth/AuthButton";

export const Header = async () => {
  const session = await getAuthSession();
  return (
    <header className="border-b border-b-accent fixed z-20 top-0 bg-background w-full">
      <div className="container flex items-center py-2 max-w-screen-xl m-auto gap-1">
        <h2 className="text-2xl font-bold mr-auto">Meetsync</h2>
        {session?.user ? "Profil" : <LoginButton />}
        <ThemeToggle />
      </div>
    </header>
  );
};
