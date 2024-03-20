import { ProfileForm } from "@/components/user/profile/ProfileForm";
import { getUserEdit } from "@/prisma/query/user.query";
import { editProfile } from "./edit-profile.action";

export default async function EditProfilePage() {
  const user = await getUserEdit();
  return (
    <div className="container mt-20 flex h-full items-center">
      <div className="flex-1 rounded-md border border-border bg-card p-4">
        <ProfileForm user={user} onSubmit={editProfile} />
      </div>
    </div>
  );
}
