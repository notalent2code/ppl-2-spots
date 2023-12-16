"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AxiosError } from "axios";
import api from "@/app/lib/apiCalls/api";
import SubmitButton from "@/app/components/SubmitButton";
import toast from "react-hot-toast";

export default function Login() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [click, setClick] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let passwordMatch = true;

  if (password !== confirmPassword) {
    passwordMatch = false;
  } else passwordMatch = true;

  async function submitResetPassword() {
    setClick(true);
    if (!token) {
      toast.error(
        "Token ganti tidak ada, mohon akses link dari email anda atau kirim email permintaan lagi",
      );
      return;
    }

    try {
      const response = await api.post("/auth/reset-password", {
        resetToken: token,
        password: password,
        confirmPassword: confirmPassword,
      });

      if (response.status === 200) {
        toast.success("Ganti password berhasil");
        push("/login");
      }
    } catch (error) {
      const err: any = error as AxiosError;
      const message = err?.response?.data?.message ?? "Gagal ganti password";

      toast.error(message);
    }
    setClick(false);
  }

  return (
    <>
      <title>Reset Password</title>

      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (passwordMatch) submitResetPassword();
        }}
      >
        <input
          type="password"
          placeholder="Password Baru"
          className="mx-3 my-1 w-11/12 rounded-xl border border-gray-300 py-2 text-center"
          required
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Ulangi Password Baru"
          className="mx-3 my-1 mt-4 w-11/12 rounded-xl border border-gray-300 py-2 text-center"
          required
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.target.value)}
        />

        {!passwordMatch && (
          <p className="absolute left-1/2 -translate-x-1/2 text-red-400">
            Password tidak cocok
          </p>
        )}

        <hr />

        <div className="mx-10 mb-10 flex justify-between gap-x-10">
          <SubmitButton
            state={click}
            style="auth-submit-button"
            label="Kirim"
          />

          <Link className="auth-link-button" href="/login">
            Login
          </Link>
        </div>
      </form>
    </>
  );
}
