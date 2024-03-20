import { buttonVariants } from "@/components/ui/button";
import { Profile } from "@/components/user/profile/Profile";
import { getAuthSession } from "@/lib/auth";
import { getUserProfile } from "@/prisma/query/user.query";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProfilePage() {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    notFound();
  }

  const user = await getUserProfile(session.user.id);
  if (!user) {
    notFound();
  }

  return (
    <div className="m-auto mt-10 max-w-xl">
      <Profile user={user}>
        {" "}
        <form className="mt-4">
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/profile/edit"
          >
            Edit profile
          </Link>
        </form>
      </Profile>
    </div>
  );
}
