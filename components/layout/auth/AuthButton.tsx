"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Loader } from "@/components/ui/loader";
import { LogIn, LogOut } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import { useTransition } from "react";

export const LoginButton = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      onClick={() => {
        startTransition(() => signIn());
      }}
    >
      {isPending ? (
        <Loader className="mr-3 size-4" />
      ) : (
        <LogIn className="mr-2 size-4" />
      )}
      Login
    </Button>
  );
};

export const LogoutDropdownMenuItem = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      onClick={() => {
        startTransition(() => signOut());
      }}
    >
      {isPending ? (
        <Loader className="mr-3 size-4" />
      ) : (
        <LogOut className="mr-2 size-4" />
      )}
      Logout
    </DropdownMenuItem>
  );
};
