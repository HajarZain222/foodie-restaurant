"use client";

import { FormEvent, useState } from "react";
import type { UserProfile } from "./ProfileCard";

interface EditProfileFormProps {
  user: UserProfile;
}

interface FormErrors {
  name?: string;
  email?: string;
  bio?: string;
  location?: string;
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
    location: user.location,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  const updateField = (
    field: keyof typeof formData,
    value: string,
  ) => {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
    setSuccessMessage("");
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.bio.trim()) {
      nextErrors.bio = "Bio is required.";
    } else if (formData.bio.trim().length < 20) {
      nextErrors.bio = "Bio must be at least 20 characters.";
    }

    if (!formData.location.trim()) {
      nextErrors.location = "Location is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      setSuccessMessage("");
      return;
    }

    setSuccessMessage("Profile updated successfully.");
  };

  return (
    <section className="rounded-2xl bg-white p-6 shadow-md transition duration-300 hover:shadow-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
        <p className="mt-2 text-sm text-gray-600">
          Update the details shown on your public profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="bio"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <textarea
            id="bio"
            rows={5}
            value={formData.bio}
            onChange={(event) => updateField("bio", event.target.value)}
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          />
          {errors.bio && (
            <p className="mt-2 text-sm text-red-500">{errors.bio}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="location"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            id="location"
            type="text"
            value={formData.location}
            onChange={(event) => updateField("location", event.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          />
          {errors.location && (
            <p className="mt-2 text-sm text-red-500">{errors.location}</p>
          )}
        </div>

        {successMessage && (
          <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {successMessage}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-orange-500 px-6 py-3 font-medium text-white shadow-md transition hover:bg-orange-600 hover:shadow-lg sm:w-auto"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
}
