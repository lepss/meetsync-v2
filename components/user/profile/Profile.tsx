import { removeHttp } from "@/lib/removeHttp";
import { UserProfile } from "@/prisma/query/user.query";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

export const Profile = ({
  user,
  children,
}: PropsWithChildren<{ user: UserProfile }>) => {
  return (
    <div className="container mt-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-2xl font-bold">{user.name}</h3>
          <p>{user?.username}</p>
        </div>
        <Avatar size="lg">
          {user.image ? (
            <AvatarImage src={user.image} alt={user.username} />
          ) : null}
          <AvatarFallback>
            {user.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      {user.bio ? (
        <p>{user.bio}</p>
      ) : (
        <p className="text-muted-foreground">no bio</p>
      )}
      <div className="mt-4 flex items-center gap-2">
        {user.link ? (
          <>
            <Link
              className="text-muted-foreground hover:underline"
              href={user.link}
            >
              {removeHttp(user.link)}
            </Link>
          </>
        ) : null}
      </div>
      {children}
    </div>
  );
};
