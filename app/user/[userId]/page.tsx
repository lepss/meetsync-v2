import { Profile } from "@/components/user/profile/Profile";
import { getAuthSession } from "@/lib/auth";
import { getUserProfile } from "@/prisma/query/user.query";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

type PageParams = {
  params: {
    userId: string;
  };
};

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const user = await getUserProfile(params.userId);
  if (!user) {
    throw new Error("User not found");
  }
  return {
    title: `${user.name} (${user.username})`,
  };
};

export default async function UserPage({ params }: PageParams) {
  const session = await getAuthSession();
  const user = await getUserProfile(params.userId);

  if (!user) {
    notFound();
  }

  const isCurrentUser = params.userId === session?.user?.id;
  if (isCurrentUser) {
    redirect("/profile");
  }

  return (
    <div className="m-auto mt-10 max-w-xl">
      <Profile user={user}></Profile>
    </div>
  );
}
