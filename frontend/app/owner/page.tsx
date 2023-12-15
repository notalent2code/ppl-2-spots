"use client";

import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import useApiSecured from "../lib/hooks/useApiSecured";
import Image from "next/image";
import moneySplitter from "../lib/moneySplitter";
import Link from "next/link";

export type Owner = {
  owner_id: number;
  user_id: number;
  nik: string | null;
  ktp_picture: string | null;
  balance: string;
  bank_name: string | null;
  card_number: string | null;
  status: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
  };
};

export default function OwnerCredential() {
  const axiosSecured = useApiSecured();

  const [owner, setOwner] = useState<Owner | null>(null);

  useEffect(() => {
    async function getOwnerProfile() {
      try {
        const response = await axiosSecured("/lib/apiCalls/owner");

        setOwner(response.data.owner);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err);
      }
    }

    getOwnerProfile();
  }, []);

  return (
    <section className="col-span-8 max-h-screen md:col-span-6">
      <title>Data Diri Anda</title>
      <div className="h-screen overflow-auto">
        <h1 className="pl-0 text-center">Data Penyedia</h1>

        <div className="mx-10 mb-4 grid min-h-[70vh] grid-cols-12 gap-y-4 rounded-xl border border-gray-300 p-4 shadow-lg">
          {owner && (
            <>
              <p className="col-span-3">Nama Depan</p>
              <div className="col-span-1">:</div>
              <div className="col-span-8 rounded-xl text-center">
                {owner.user.first_name}
              </div>

              <p className="col-span-3">Nama Belakang</p>
              <div className="col-span-1">:</div>
              <div className="col-span-8 rounded-xl text-center">
                {owner.user.last_name}
              </div>

              <p className="col-span-3">Email</p>
              <div className="col-span-1">:</div>
              <div className="col-span-8 rounded-xl text-center">
                {owner.user.email}
              </div>

              <p className="col-span-3">Nomor Telepon</p>
              <div className="col-span-1">:</div>
              <div className="col-span-8 rounded-xl text-center">
                {owner.user.phone_number}
              </div>

              <p className="col-span-3">NIK</p>
              <div className="col-span-1">:</div>
              <div className="col-span-8 rounded-xl text-center">
                {owner.nik ? (
                  owner.nik
                ) : (
                  <span className="rounded-md bg-red-500 px-4 text-white">
                    Belum diisi!
                  </span>
                )}
              </div>

              <p className="col-span-3">Bank</p>
              <div className="col-span-1">:</div>
              <div className="col-span-8 rounded-xl text-center">
                {owner.bank_name ? (
                  owner.bank_name
                ) : (
                  <span className="rounded-md bg-red-500 px-4 text-white">
                    Belum diisi!
                  </span>
                )}
              </div>

              <p className="col-span-3">Nomor Kartu</p>
              <div className="col-span-1">:</div>
              <div className="col-span-8 rounded-xl text-center">
                {owner.card_number ? (
                  owner.card_number
                ) : (
                  <span className="rounded-md bg-red-500 px-4 text-white">
                    Belum diisi!
                  </span>
                )}
              </div>

              <p className="col-span-3">Balance</p>
              <div className="col-span-1">:</div>
              <div className="col-span-8 rounded-xl text-center">
                Rp. {moneySplitter(owner.balance)}
              </div>

              <p className="col-span-3">KTP</p>
              <div className="col-span-1">:</div>
              <div className="col-span-8 grid justify-center rounded-xl text-center">
                {owner.ktp_picture ? (
                  <Image
                    alt={`ktp ${owner.user.first_name} ${owner.user.last_name}`}
                    src={owner.ktp_picture}
                    width={200}
                    height={200}
                    style={{
                      width: "auto",
                      height: "100%",
                    }}
                    priority
                    className="rounded-sm"
                  />
                ) : (
                  <span className="rounded-md bg-red-500 px-4 text-white">
                    Belum diisi!
                  </span>
                )}
              </div>

              <p className="col-span-3">Status</p>
              <div className="col-span-1">:</div>
              <div className="col-span-8 rounded-xl text-center">
                {owner.status === "APPROVED" ? (
                  <span className="rounded-lg bg-green-400 p-2">
                    {owner.status}
                  </span>
                ) : owner.status === "REJECTED" ? (
                  <span className="rounded-lg bg-red-400 p-2">
                    {owner.status}
                  </span>
                ) : (
                  <span className="rounded-lg bg-yellow-400 p-2">
                    {owner.status}
                  </span>
                )}
              </div>

              {!owner.nik &&
                !owner.bank_name &&
                !owner.card_number &&
                !owner.ktp_picture && (
                  <Link
                    className="col-span-4 col-start-5 my-auto w-full cursor-pointer rounded-lg bg-green-300 py-2 text-center font-semibold"
                    href={"/owner/edit/datadiri"}
                  >
                    Lengkapi Data
                  </Link>
                )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
