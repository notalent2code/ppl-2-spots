"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { useUserInfoContext } from "@/app/lib/hooks/useUserInfoContext";
import toast from "react-hot-toast";
import ResetPasswordModal from "@/app/components/ForgotPasswordModal";

export default function Login() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const { setUserType } = useUserInfoContext();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleModal = useCallback(() => {
    setOpenModal((value) => !value);
  }, []);

  async function submitLogin() {
    try {
      const response = await axios.post("/lib/apiCalls/auth/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const userType = response.data.userType;
        let homeUrl = "/";

        setUserType(userType);

        switch (userType) {
          case "TENANT":
            break;
          case "OWNER":
            homeUrl = "/owner";
            break;
          case "ADMIN":
            homeUrl = "/admin/penyewa";
          default:
            break;
        }

        toast.success("Login berhasil");
        if (searchParams.get("redirect") === "true") {
          router.back();
        } else {
          setTimeout(() => {
            router.push(homeUrl);
          }, 500);
        }
      }
    } catch (error) {
      const err: any = error as AxiosError;
      const message =
        err?.response?.data?.message ?? err?.response?.data ?? "Daftar gagal";
      toast.error(message);
    }
  }

  return (
    <>
      <title>Login</title>

      {openModal && <ResetPasswordModal toggleModal={toggleModal} />}

      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          submitLogin();
        }}
      >
        <input
          type="text"
          placeholder="Email Anda"
          className="mx-3 my-1 w-11/12 rounded-xl border border-gray-300 py-2 text-center"
          required
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password Anda"
          className="mx-3 my-1 mt-4 w-11/12 rounded-xl border border-gray-300 py-2 text-center"
          required
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />

        <hr />

        <p
          className="mt-2 flex cursor-pointer px-8 text-xs text-blue-500 md:px-12"
          onClick={toggleModal}
        >
          Lupa password?
        </p>

        <div className="mx-10 mb-10 flex justify-between gap-x-10">
          <button type="submit" className="auth-submit-button">
            Masuk
          </button>
          <Link className="auth-link-button" href="/signup">
            Daftar
          </Link>
        </div>
      </form>
    </>
  );
}
