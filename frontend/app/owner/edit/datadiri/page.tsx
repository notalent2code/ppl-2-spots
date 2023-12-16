"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Owner } from "../../page";
import useApiSecured from "@/app/lib/hooks/useApiSecured";
import SubmitButton from "@/app/components/SubmitButton";
import toast from "react-hot-toast";

export default function EditOwnerCredential() {
  const { push } = useRouter();
  const axiosSecured = useApiSecured();

  const [isFirstTimeEdit, setIsFirstTimeEdit] = useState(true);
  const [click, setClick] = useState(false);

  const [image, setImage] = useState<File | null>(null);
  const [nik, setNik] = useState("");
  const [bankName, setBankName] = useState("");
  const [cardNumber, setCardNumber] = useState<number>(0);

  useEffect(() => {
    async function getOwnerProfile() {
      try {
        const response = await axiosSecured("/lib/apiCalls/owner");
        const owner: Owner = response.data.owner;

        if (owner.ktp_picture) setIsFirstTimeEdit(false);
        setNik(owner?.nik ?? "");
        setBankName(owner?.bank_name ?? "");
        setCardNumber(owner?.card_number ? parseInt(owner.card_number) : 0);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err);
      }
    }

    getOwnerProfile();
  }, []);

  async function getOwnerProfile() {
    setClick(true);
    try {
      const form = new FormData();

      if (image !== null) form.append("ktpURL", image);
      form.append("nik", nik);
      form.append("bankName", bankName);
      form.append("cardNumber", cardNumber.toString());

      const response = await axiosSecured.put("/lib/apiCalls/owner", form);

      if (response.status === 200) {
        toast.success("Data diperbaharui");
        setTimeout(() => push("/owner"), 200);
      }
    } catch (error) {
      const err = error as AxiosError;

      // @ts-ignore
      if (err.response?.data?.message) toast.error(err.response.data.message);
    }
    setClick(false);
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
        <section className="mb-8 rounded-xl border border-gray-300 py-4 shadow-lg sm:pt-0">
          <div className="flex justify-center">
            <div className="w-10/12 items-center justify-center sm:flex">
              <p className="w-full text-lg text-black sm:w-4/12">Nama Bank</p>
              <input
                type="text"
                className="my-5 w-full rounded-xl border py-2 text-center text-black sm:w-8/12"
                value={bankName}
                onChange={(e: any) => setBankName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-10/12 items-center justify-center sm:flex">
              <p className="w-full text-lg text-black sm:w-4/12">
                Nomor Kartu{" "}
              </p>
              <input
                type="number"
                className="my-5 w-full rounded-xl border py-2 text-center text-black sm:w-8/12"
                value={cardNumber === 0 ? "" : cardNumber}
                onChange={(e: any) => setCardNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-10/12 items-center justify-center sm:flex">
              <p className="w-full text-lg text-black sm:w-4/12">NIK</p>
              <input
                type="text"
                className="my-5 w-full rounded-xl border py-2 text-center text-black sm:w-8/12"
                value={nik}
                onChange={(e: any) => setNik(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-10/12 items-center justify-center sm:flex">
              <p className="w-full text-lg text-black sm:w-4/12">KTP</p>
              <div className="my-5 h-20 w-full rounded-xl border-2 border-dashed border-darkblue bg-slate-300 sm:w-8/12">
                <input
                  type="file"
                  className="h-full w-full p-6 text-black"
                  onChange={(e: any) => setImage(e.target.files[0])}
                  accept=".jpg, .jpeg, .png"
                  required={isFirstTimeEdit}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-evenly">
            <SubmitButton
              state={click}
              style="button-color-state focus:ring-0 mt-4 block bg-green-700 px-20 py-3 text-white hover:bg-green-500 active:bg-teal-600"
              label="Submit"
            />
          </div>
        </section>
      </form>
    </section>
  );
}
