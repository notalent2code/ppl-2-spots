"use client";

import useApiSecured from "@/app/lib/hooks/useApiSecured";
import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
//import { usePathname, useRouter } from "next/navigation"
//import { useCallback, useEffect, useState } from "react"
//import { BiAlignRight } from 'react-icons/bi'
//import { useMediaQuery } from "react-responsive"

export default function AsideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();

  const axiosSecured = useApiSecured();

  async function logout() {
    try {
      const response = await axiosSecured.delete("/lib/apiCalls/auth/logout");

      if (response.status === 200) {
        toast.success(response.data.message);
        push("/login");
      }
    } catch (error) {
      const err = error as AxiosError;
      console.error(err?.response);
    }
  }

  return (
    <aside className="col-span-8 block w-full place-content-between overflow-y-scroll bg-darkblue md:col-span-2 md:grid md:h-screen">
      {/* {!isNotPhone &&
        <div className="md:flex block w-full bg-[#17224D] relative h-12">
          <Image 
            className="absolute top-3 left-3"
            alt='logo' 
            src="/SPOTS-white-icon.svg"  
            width={25} height={25} />
          <BiAlignRight 
            className="absolute top-4 right-4 border-white border-2 scale-150 bg-[#17224D]"
            onClick={toggleOpen}/>
        </div>
      } */}

      {/* {(isOpen || isNotPhone) && */}
      <>
        <div className="md:col-span-2">
          <div className="right flex flex-col items-center">
            <div className="right mt-5 flex flex-col items-center">
              <Image
                alt="logo"
                src="/spots-white-icon.svg"
                width={200}
                height={200}
                priority
                className="scale-50"
              />
            </div>
          </div>

          {children}
        </div>

        <div className="mb-10 mt-5 md:col-span-2">
          <div className="flex items-center justify-center md:flex-col">
            <button
              className="my-1 w-5/6 border border-white bg-transparent p-3 text-left text-white hover:bg-slate-500 active:bg-blue-600"
              onClick={logout}
            >
              ← &nbsp; Keluar
            </button>
          </div>
        </div>
      </>
    </aside>
  );
}
