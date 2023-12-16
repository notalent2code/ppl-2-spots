"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const { push } = useRouter();
  const [keyWord, setKeyWord] = useState("");

  return (
    <>
      <form
        className="relative flex w-full flex-wrap px-6 sm:px-12"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          push(`/eksplorasi?search=${keyWord}`);
        }}
      >
        <input
          type="text"
          className="mx-auto h-12 flex-auto rounded-full border border-solid border-neutral-400 bg-transparent px-5 text-base font-normal"
          placeholder="Masukkan Kata Kunci"
          value={keyWord}
          onChange={(e: any) => setKeyWord(e.target.value)}
        />

        <button
          className="button-color-state mt-4 h-12 w-full rounded-full bg-darkblue px-6 py-2 font-medium text-white stm:ml-12 stm:mt-0 stm:w-36"
          type="submit"
        >
          Cari
        </button>
      </form>
    </>
  );
}
