"use client";

import Link from "next/link";
import Image from "next/image";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-30 flex w-full justify-between bg-darkblue px-6 py-2">
      <div>
        <Link className="inline-flex items-center" href="/">
          <Image
            alt="logo"
            src="/spots-white-icon.svg"
            height={50}
            width={50}
            priority={true}
          />
        </Link>
      </div>

      {/* <input
        type="text"
        className="mx-12 my-2 flex rounded-full border border-neutral-400 bg-neutral-800 px-5 text-base font-normal"
        placeholder="Telusuri"
      /> */}

      <div className="inline-flex">
        <div className="flex w-full flex-col items-start justify-center lg:ml-auto lg:h-auto lg:w-auto lg:flex-row lg:items-center">
          <Link
            className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:text-green-500 lg:inline-flex lg:w-auto"
            href="/eksplorasi"
          >
            Telusuri
          </Link>
        </div>
      </div>

      <UserMenu />
    </nav>
  );
}
