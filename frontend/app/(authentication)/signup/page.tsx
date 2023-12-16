"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AxiosError } from "axios";
import api from "@/app/lib/apiCalls/api";
import phoneNumberFormatCheck from "@/app/lib/phoneNumberParser";
import SubmitButton from "@/app/components/SubmitButton";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [click, setClick] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("TENANT");

  const style =
    "mx-auto md:mt-0 mt-4 w-11/12 rounded-xl border border-gray-300 py-2 text-center";

  let passwordMatch = true;

  if (password !== confirmPassword) {
    passwordMatch = false;
  } else passwordMatch = true;

  async function registerUser() {
    setClick(true);
    try {
      const response = await api.post("/auth/register", {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        userType: userType,
      });

      if (response.status === 201) {
        toast.success("Akun berhasil didaftarkan");
        router.push("/login");
      }
    } catch (error) {
      const err = error as AxiosError;
      //@ts-ignore
      const message = err?.response?.data?.message ?? "Daftar gagal";
      toast.error(message);
    }
    setClick(false);
  }

  return (
    <>
      <title>Signup</title>

      <form
        className="gap-y-4 md:grid"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (password.length < 8) {
            toast.error("Password minimal 8 digit!");
          } else if (!phoneNumberFormatCheck(phoneNumber)) {
            toast.error(
              "Nomor telepon harus disertai kode negara dan hanya berisi angka",
            );
          } else if (passwordMatch) {
            registerUser();
          } else toast.error("Password tidak cocok!");
        }}
      >
        <input
          type="text"
          placeholder="Nama Depan"
          className={"-mt-4 " + style}
          required
          value={firstName}
          onChange={(e: any) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Nama Belakang"
          className={style}
          required
          value={lastName}
          onChange={(e: any) => setLastName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Alamat Email"
          className={style}
          required
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Kata Sandi"
          required
          className={style}
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Ulangi Kata Sandi"
          className={style}
          required
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.target.value)}
        />

        {!passwordMatch && (
          <p className="-my-3 text-red-400">Password tidak cocok</p>
        )}

        <input
          type="number"
          placeholder="Nomor Telepon. cth: 628***"
          className={
            style +
            " [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          }
          required
          value={phoneNumber}
          onChange={(e: any) => setPhoneNumber(e.target.value)}
        />

        <div className="mx-auto mt-4 flex w-11/12 items-center justify-evenly py-2 md:mt-0">
          <p>Daftar Sebagai</p>

          <select
            className="select select-bordered w-full max-w-xs rounded-xl border-2 border-gray-300 py-2 text-center"
            required
            value={userType}
            onChange={(e: any) => setUserType(e.target.value)}
          >
            <option value="TENANT">Penyewa</option>
            <option value="OWNER">Penyedia</option>
          </select>
        </div>

        <hr className="mt-4" />

        <div className="mx-10 mb-10 flex justify-between gap-x-10">
          <SubmitButton
            state={click}
            style="auth-submit-button"
            label="Daftar"
          />
          <Link className="auth-link-button" href="/login">
            Login
          </Link>
        </div>
      </form>
    </>
  );
}
