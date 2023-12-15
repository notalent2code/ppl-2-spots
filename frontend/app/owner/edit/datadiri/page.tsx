"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AxiosError } from "axios";
import useApiSecured from "@/app/lib/hooks/useApiSecured";
import toast from "react-hot-toast";

export default function EditOwnerCredential() {
  const { push } = useRouter();
  const axiosSecured = useApiSecured();

  const [image, setImage] = useState<File | null>(null);
  const [nik, setNik] = useState("");
  const [bankName, setBankName] = useState("");
  const [cardNumber, setCardNumber] = useState<number>(0);

  async function getOwnerProfile() {
    try {
      const form = new FormData();

      if (image !== null) form.append("ktpURL", image);
      form.append("nik", nik);
      form.append("bankName", bankName);
      form.append("cardNumber", cardNumber.toString());

      const response = await axiosSecured.put("/lib/apiCalls/owner", form);
      console.log(response);
      if (response.status === 200) {
        toast.success("Data diperbaharui");
        setTimeout(() => push("/owner"), 200);
      }
    } catch (error) {
      const err = error as AxiosError;

      // @ts-ignore
      if (err.response?.data?.message) toast.error(err.response.data.message);
    }
  }

  return (
    <section className="col-span-8 h-screen max-h-screen overflow-y-scroll px-4 pb-8 md:col-span-6">
      <title>Update Data Diri</title>
      <h1 className="pl-0 text-center">Perbarui Data Penyedia</h1>

      <form
        className="block"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          getOwnerProfile();
        }}
      >
        <section className="mx-10 mb-4 rounded-xl border pb-4 shadow-lg">
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
                type="number"
                className="m-5 w-8/12 rounded-xl border py-2 text-center text-black"
                value={cardNumber === 0 ? "" : cardNumber}
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
                  accept=".jpg, .jpeg, .png"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-evenly">
            <button
              className="button-color-state mt-4 block bg-green-700 px-20 py-3 text-white hover:bg-green-500 active:bg-teal-600"
              type="submit"
            >
              Submit
            </button>
          </div>
        </section>
      </form>
    </section>
  );
}
