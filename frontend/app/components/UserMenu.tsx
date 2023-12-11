"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import useApiSecured from "../lib/hooks/useApiSecured";
import { useUserInfoContext } from "../lib/hooks/useUserInfoContext";

const UserMenu = () => {
  const { push } = useRouter();
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const axiosSecured = useApiSecured();
  const { profile, setProfile } = useUserInfoContext();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  async function logout() {
    try {
      const response = await axiosSecured.delete("/lib/apiCalls/auth/logout");

      if (response.status === 200) {
        toast.success(response.data.message);
        setProfile(null);
        setIsOpen(false);
        push("/");
      }
    } catch (error) {
      const err = error as AxiosError;
      console.error(err?.response);
    }
  }

  return (
    <div className="inline-flex">
      <div className="flex w-full flex-col items-start justify-center lg:ml-auto  lg:h-auto lg:w-auto lg:flex-row lg:items-center">
        {profile?.avatar_url && (
          <Image
            className="cursor-pointer rounded-full bg-white p-1"
            src={profile.avatar_url}
            width={40}
            height={40}
            alt="user"
            onClick={toggleOpen}
          />
        )}

        {!profile?.avatar_url && (
          <Link
            className="w-full justify-center rounded bg-white px-3 py-2 font-bold hover:bg-green-500 hover:text-white lg:inline-flex lg:w-auto"
            href="/login"
          >
            Login
          </Link>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-4 top-16 w-fit overflow-hidden rounded-xl bg-white text-sm shadow-md">
          <div className="flex cursor-pointer flex-col">
            <Link
              className="px-4 py-3 font-medium text-black transition hover:bg-blue-100"
              href={"/profile"}
            >
              Profile
            </Link>
            <Link
              className="px-4 py-3 font-medium text-black transition hover:bg-blue-100"
              href="/riwayat-booking"
            >
              Booking Anda
            </Link>
            <div
              className="px-4 py-3 font-medium text-black transition hover:bg-blue-100"
              onClick={logout}
            >
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
