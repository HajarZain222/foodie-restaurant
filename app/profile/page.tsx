import { Suspense } from "react";
import EditProfileForm from "@/components/EditProfileForm";
import ProfileCard, { type UserProfile } from "@/components/ProfileCard";

export const metadata = {
  title: "Profile",
  description: "Manage your Foodie profile",
};

async function getUserProfile(): Promise<UserProfile> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    name: "Hajar Zain",
    email: "hajarzain222@gmail.com",
    bio: "Home cook and recipe explorer who loves finding simple meals with big flavor.",
    location: "Mansoura, Egypt",
    image: "/profile-logo.png",
  };
}

function ProfileSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <div className="mx-auto h-32 w-32 animate-pulse rounded-full bg-gray-200" />
        <div className="mx-auto mt-6 h-7 w-44 animate-pulse rounded-full bg-gray-200" />
        <div className="mx-auto mt-3 h-5 w-56 animate-pulse rounded-full bg-gray-200" />
        <div className="mt-8 space-y-3">
          <div className="h-4 animate-pulse rounded-full bg-gray-200" />
          <div className="h-4 animate-pulse rounded-full bg-gray-200" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-md">
        <div className="h-8 w-48 animate-pulse rounded-full bg-gray-200" />
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="h-12 animate-pulse rounded-xl bg-gray-200" />
          <div className="h-12 animate-pulse rounded-xl bg-gray-200" />
          <div className="h-32 animate-pulse rounded-xl bg-gray-200 sm:col-span-2" />
          <div className="h-12 animate-pulse rounded-xl bg-gray-200 sm:col-span-2" />
        </div>
      </div>
    </div>
  );
}

async function ProfileContent() {
  const user = await getUserProfile();

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      <ProfileCard user={user} />
      <EditProfileForm user={user} />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
          <p className="mt-2 text-gray-600">
            View your account details and keep your profile information fresh.
          </p>
        </div>

        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileContent />
        </Suspense>
      </div>
    </main>
  );
}
