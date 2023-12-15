"use client";

import Link from "next/link";
import AsideLayout from "./AsideLayout";
import { usePathname } from "next/navigation";

export default function OwnerAside() {
  const activeColor = "bg-blue-700 ";
  const path = usePathname();

  const menu1Condition = path.endsWith("/owner");
  const menu2Condition = path.endsWith("/datadiri");
  const menu3Condition = path.endsWith("/riwayat-booking");
  const menu4Condition = path.endsWith("/coworking-space");
  const menu5Condition = path.endsWith("/tambah");

  return (
    <AsideLayout>
      <p className="mx-5 mb-10 text-center text-3xl text-white">Owner</p>

      <Link
        className={
          (menu1Condition ? activeColor : "hover:bg-slate-500 ") +
          "block w-full p-2 text-left font-semibold text-white"
        }
        as="/owner"
        href="/owner"
      >
        | &nbsp; Datadiri
      </Link>

      <Link
        className={
          (menu2Condition ? activeColor : "hover:bg-slate-500 ") +
          "block w-full p-2 text-left font-semibold text-white"
        }
        as="/owner/edit/datadiri"
        href="/owner/edit/datadiri"
      >
        | &nbsp; Update Datadiri
      </Link>

      <Link
        className={
          (menu3Condition ? activeColor : "hover:bg-slate-500 ") +
          "block w-full p-2 text-left font-semibold text-white"
        }
        as="/owner/riwayat-booking"
        href="/owner/riwayat-booking"
      >
        | &nbsp; Riwayat Booking
      </Link>

      <Link
        className={
          (menu4Condition ? activeColor : "hover:bg-slate-500 ") +
          "block w-full truncate p-2 text-left font-semibold text-white"
        }
        as="/owner/coworking-space"
        href="/owner/coworking-space"
      >
        | &nbsp; Coworking Space Saya
      </Link>

      <Link
        className={
          (menu5Condition ? activeColor : "hover:bg-slate-500 ") +
          "block w-full p-2 text-left font-semibold text-white"
        }
        as="/owner/coworking-space/tambah"
        href="/owner/coworking-space/tambah"
      >
        | &nbsp; Tambah Space
      </Link>
    </AsideLayout>
  );
}
