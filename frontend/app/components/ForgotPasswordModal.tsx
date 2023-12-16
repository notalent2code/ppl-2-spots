"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import api from "../lib/apiCalls/api";
import toast from "react-hot-toast";
import { GoX } from "react-icons/go";
import SubmitButton from "./SubmitButton";

export default function ResetPasswordModal({
  toggleModal,
}: {
  toggleModal: () => void;
}) {
  const [email, setEmail] = useState("");
  const [click, setClick] = useState(false);

  async function sendPassordResetEmail() {
    setClick(true);
    try {
      const response = await api.post("/auth/forgot-password", {
        email: email,
      });

      if (response.status === 200) {
        toast.success(
          "Email ubah password berhasil dikirim, Mohon cek email Anda",
        );
        toggleModal();
      }
    } catch (error) {
      const err = error as AxiosError;
      const message =
        //@ts-ignore
        err?.response?.data?.message ?? "Kirim email ubah password gagal";
      toast.error(message);
    }
    setClick(false);
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-screen bg-black bg-opacity-50">
      <div className="absolute left-1/2 top-1/2 z-30 w-1/2 min-w-min -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-4 pt-6">
        <button
          className="absolute right-0 top-0 rounded-none rounded-bl-md rounded-tr-xl bg-red-500 p-1 text-white"
          onClick={toggleModal}
        >
          <GoX />
        </button>

        <p>Kirim Email ganti password</p>

        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            sendPassordResetEmail();
          }}
        >
          <input
            type="email"
            placeholder="Email Anda"
            required
            className={
              "mx-auto mb-4 mt-4 w-11/12 rounded-xl border border-gray-300 py-2 text-center"
            }
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />

          <SubmitButton
            state={click}
            style="border-2 border-darkblue bg-darkblue px-6 py-3 text-white hover:border-sky-900 hover:bg-sky-900 active:border-teal-600 active:bg-teal-600 md:px-12"
            label="Kirim"
          />
        </form>
      </div>
    </div>
  );
}
