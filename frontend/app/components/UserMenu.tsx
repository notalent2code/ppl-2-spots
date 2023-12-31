"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import useApiSecured from "../lib/hooks/useApiSecured";
import { useUserInfoContext } from "../lib/hooks/useUserInfoContext";
import * as NProgress from "nprogress";
import toast from "react-hot-toast";

const UserMenu = () => {
  const { push } = useRouter();
  const path = usePathname();
  const axiosSecured = useApiSecured();
  const { profile, userType, setProfile, setUserType } = useUserInfoContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [path, userType]);

  async function logout() {
    NProgress.start();
    try {
      const response = await axiosSecured.delete("/lib/apiCalls/auth/logout");

      if (response.status === 200) {
        toast.success(response.data.message);
        setIsOpen(false);
        push("/");
      }
    } catch (error) {
      console.error("Error while logging out");
    }
    NProgress.done();
    setProfile(null);
    setUserType("UNASSIGNED");
  }

  return (
    <div className="inline-flex">
      <div className="flex w-full flex-col items-start justify-center lg:ml-auto  lg:h-auto lg:w-auto lg:flex-row lg:items-center">
        {profile?.avatar_url && userType === "TENANT" && (
          <Image
            className="aspect-square cursor-pointer rounded-full bg-white object-cover p-1"
            src={profile.avatar_url}
            width={40}
            height={40}
            alt="user"
            onClick={toggleOpen}
          />
        )}

        {!profile?.avatar_url && userType === "UNASSIGNED" && (
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
