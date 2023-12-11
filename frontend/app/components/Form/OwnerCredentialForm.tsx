"use client";

import Link from "next/link";
import { useState } from "react";

export default function OwnerInfoForm() {
  const [image, setImage] = useState(null);
  const [nik, setNik] = useState("");
  const [bankName, setBankName] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  return (
    <>
      <div className="flex justify-center">
        <h1>DATA OWNER</h1>
      </div>

      <form
        className="block"
        onSubmit={(e: any) => {
          e.preventDefault();
        }}
      >
        <section className="mx-10 mb-4 rounded-xl pb-4 shadow-lg">
          <div className="flex justify-center">
            <div className="flex w-10/12 items-center justify-center">
              <p className="w-4/12 text-lg text-black">Nama Bank</p>
              <input
                type="text"
                className="m-5 w-8/12 rounded-xl border py-2 text-center text-black"
                value={bankName}
                onChange={(e: any) => setBankName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex w-10/12 items-center justify-center">
              <p className="w-4/12 text-lg text-black">Nomor Kartu </p>
              <input
                type="text"
                className="m-5 w-8/12 rounded-xl border py-2 text-center text-black"
                value={cardNumber}
                onChange={(e: any) => setCardNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex w-10/12 items-center justify-center">
              <p className="w-4/12 text-lg text-black">NIK</p>
              <input
                type="text"
                className="m-5 w-8/12 rounded-xl border py-2 text-center text-black"
                value={nik}
                onChange={(e: any) => setNik(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex w-10/12 items-center justify-center">
              <p className="w-4/12 text-lg text-black">KTP</p>
              <div className="m-5 h-20 w-8/12 rounded-xl border-2 border-dashed border-darkblue bg-slate-300">
                <input
                  type="file"
                  className="h-full w-full p-6 text-black"
                  onChange={(e: any) => setImage(e.target.files[0])}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-evenly">
            <button
              className="mt-4 w-fit bg-green-500 p-3 text-center font-semibold text-darkblue hover:bg-green-600 active:bg-green-700"
              type="submit"
            >
              Submit
            </button>
          </div>
        </section>
      </form>
    </>
  );
}
