import Image from "next/image";
import { Mail, MapPin } from "lucide-react";

export interface UserProfile {
  name: string;
  email: string;
  bio: string;
  location: string;
  image: string;
}

interface ProfileCardProps {
  user: UserProfile;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="h-24 bg-gradient-to-r from-orange-500 to-orange-600" />

      <div className="px-6 pb-6">
        <div className="-mt-16 flex justify-center">
          <div className="rounded-full bg-white p-2 shadow-lg">
            <Image
              src={user.image}
              alt={`${user.name} profile image`}
              width={128}
              height={128}
              priority
              className="h-32 w-32 rounded-full object-cover"
            />
          </div>
        </div>

        <div className="mt-5 text-center">
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>

          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Mail className="h-4 w-4 text-orange-500" />
            <span>{user.email}</span>
          </div>

          <div className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4 text-orange-500" />
            <span>{user.location}</span>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-orange-50 p-4">
          <p className="text-sm leading-6 text-gray-700">{user.bio}</p>
        </div>
      </div>
    </section>
  );
}
