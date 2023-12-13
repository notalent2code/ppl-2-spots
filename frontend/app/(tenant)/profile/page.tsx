"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { AxiosError } from "axios";
import useApiSecured from "@/app/lib/hooks/useApiSecured";
import { useUserInfoContext } from "@/app/lib/hooks/useUserInfoContext";
import toast from "react-hot-toast";
import TenantProfileLoadingCard from "./loading";

export default function Profile() {
  const { push } = useRouter();
  const axiosSecured = useApiSecured();
  const { profile, userType, setProfile } = useUserInfoContext();

  const [editInput, setEditInput] = useState(false);

  const [picture, setPicture] = useState<File | null>(null);
  const [firstName, setFirstName] = useState(profile?.user.first_name);
  const [lastName, setLastName] = useState(profile?.user.last_name);
  const [email, setEmail] = useState(profile?.user.email);
  const [phoneNumber, setPhoneNumber] = useState(profile?.user.phone_number);

  const enableEdit = useCallback(() => {
    setEditInput((value) => !value);
  }, []);

  const cancel = useCallback(() => {
    setPicture(null);
    setFirstName(profile?.user.first_name);
    setLastName(profile?.user.last_name);
    setEmail(profile?.user.email);
    setPhoneNumber(profile?.user.phone_number);
    setEditInput((value) => !value);
  }, []);

  async function updateProfile() {
    if (!profile) return;

    try {
      const form = new FormData();

      if (picture !== null) form.append("avatarURL", picture);
      if (firstName && firstName !== profile.user.first_name)
        form.append("firstName", firstName);
      if (lastName && lastName !== profile.user.last_name)
        form.append("lastName", lastName);
      if (email && email !== profile.user.email) form.append("email", email);
      if (phoneNumber && phoneNumber !== profile.user.phone_number)
        form.append("phoneNumber", phoneNumber);

      if (form.entries().next().done) {
        setEditInput(false);
        return;
      }

      const response = await axiosSecured.put("/lib/apiCalls/tenant", form);

      setProfile(response.data.tenant);
      setEditInput((value) => !value);
      toast.success("Ubah profil berhasil");
    } catch (error) {
      const err: any = error as AxiosError;
      toast.error(err?.response?.data?.message);
    }
  }

  if (!profile) return <TenantProfileLoadingCard />;
  if (userType === "UNASSIGNED") push("/");

  return (
    <form
      className="justtify-center mb-10 mt-6 block items-center bg-darkblue pb-6"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateProfile();
      }}
    >
      <div className="flex justify-center">
        <div className="m-4 rounded-2xl bg-slate-100 p-4">
          <Image
            alt="profile-picture"
            className="aspect-square rounded-md object-cover"
            // @ts-ignore
            src={
              !editInput
                ? profile?.avatar_url
                : picture
                ? URL.createObjectURL(picture)
                : profile?.avatar_url
            }
            width={200}
            height={200}
          />

          {editInput && (
            <label className="mt-4 flex h-10 items-center justify-center rounded-lg bg-blue-400 text-center font-medium text-white hover:cursor-pointer">
              Upload Gambar
              <input
                type="file"
                className="absolute flex w-20 opacity-0"
                onChange={(e: any) => setPicture(e.target.files[0])}
                accept="image/*"
              />
            </label>
          )}
        </div>
      </div>

      <div className="mx-8 rounded-xl bg-darkgray p-3">
        <div className="my-3 grid grid-cols-1 items-center md:grid-cols-3">
          <p className="w-full text-xl font-medium text-white">Nama Depan</p>
          <input
            className="w-full break-words rounded-md bg-gray-700 px-2 text-xl font-medium text-white enabled:bg-neutral-500 md:col-span-2"
            value={firstName}
            onChange={(e: any) => setFirstName(e.target.value)}
            disabled={!editInput}
          />
        </div>

        <div className="my-3 grid grid-cols-1 items-center md:grid-cols-3">
          <p className="w-full text-xl font-medium text-white">Nama Belakang</p>
          <input
            className="w-full break-words rounded-md bg-gray-700 px-2 text-xl font-medium text-white enabled:bg-neutral-500 md:col-span-2"
            value={lastName}
            onChange={(e: any) => setLastName(e.target.value)}
            disabled={!editInput}
          />
        </div>

        <div className="my-3 grid grid-cols-1 items-center md:grid-cols-3">
          <p className="w-full text-xl font-medium text-white">Email</p>
          <input
            className="w-full break-words rounded-md bg-gray-700 px-2 text-xl font-medium text-white enabled:bg-neutral-500 md:col-span-2"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            disabled={!editInput}
          />
        </div>

        <div className="my-3 grid grid-cols-1 items-center md:grid-cols-3">
          <p className="w-full text-xl font-medium text-white">Nomor Telepon</p>
          <input
            className="w-full break-words rounded-md bg-gray-700 px-2 text-xl font-medium text-white enabled:bg-neutral-500 md:col-span-2"
            value={phoneNumber}
            onChange={(e: any) => setPhoneNumber(e.target.value)}
            disabled={!editInput}
          />
        </div>

        <div className="grid items-center justify-center gap-y-6 pt-4 md:flex md:gap-x-28">
          {!editInput ? (
            <button
              className="green-button-state m-auto w-48 rounded-full py-3"
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.preventDefault();
                enableEdit();
              }}
            >
              Edit
            </button>
          ) : (
            <>
              <button
                className="green-button-state w-48 rounded-full py-3"
                type="submit"
              >
                Submit
              </button>

              <button
                className="white-button-state w-48 rounded-full py-3"
                type="button"
                onClick={cancel}
              >
                Batal
              </button>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
