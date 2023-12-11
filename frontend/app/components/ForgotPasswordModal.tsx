"use client";

import { FormEvent, useState } from "react";
import api from "../lib/apiCalls/api";
import toast from "react-hot-toast";

export default function ResetPasswordModal({
  toggleModal,
}: {
  toggleModal: () => void;
}) {
  const [email, setEmail] = useState("");

  async function sendPassordResetEmail() {
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
      toast.error("Kirim email ubah password gagal");
    }
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-screen bg-black bg-opacity-50">
      <div className="absolute left-1/2 top-1/2 z-30 w-1/2 min-w-min -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-4">
        <button
          className="absolute right-0 top-0 rounded-none rounded-bl-md rounded-tr-xl bg-red-500 px-1 text-white"
          onClick={toggleModal}
        >
          X
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

          <button className="bg-blue-700 px-6 py-2 text-white">Kirim</button>
        </form>
      </div>
    </div>
  );
}
