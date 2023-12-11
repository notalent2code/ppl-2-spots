"use client";

import StatusBlockColor from "@/app/components/StatusBlockColor";
import useApiSecured from "@/app/lib/hooks/useApiSecured";
import { AxiosError } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export type Owner = {
  owner_id: number;
  user_id: number;
  nik: string;
  ktp_picture: string;
  balance: string;
  bank_name: string;
  card_number: string;
  status: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
  };
};

export default function AdminPenyedia() {
  const axiosSecured = useApiSecured();

  const [isFetched, setIsFetched] = useState(false);
  const [owners, setOwners] = useState<Owner[] | null>(null);

  useEffect(() => {
    async function getOwner() {
      try {
        const response = await axiosSecured("/lib/apiCalls/admin/getOwner");
        setOwners(response.data.owners);
        setIsFetched(true);
      } catch (error) {
        const err = error as AxiosError;
        console.log("err admin ", err.response);
      }
    }
    getOwner();
  }, []);

  async function approvePenyedia(owner_id: number, approval: boolean) {
    const status = approval ? "APPROVED" : "REJECTED";

    try {
      await axiosSecured.put("/lib/apiCalls/admin/getOwner", {
        id: owner_id,
        status: status,
      });
      toast.success("Verifikasi berhasil");
      setTimeout(() => location.reload(), 200);
    } catch (error) {
      toast.error("Verifikasi gagal");
    }
  }

  return (
    <section className="table-section">
      <title>Data Penyedia Tempat</title>

      <h1 className="table-h1">Data Penyedia Tempat</h1>

      <table className="table-container h-5/6 ">
        <thead className="table-head">
          <tr className="flex w-full items-center rounded-tl-xl rounded-tr-xl bg-darkgray text-center">
            <th className="w-10 p-2 font-medium text-white">Owner ID</th>
            <th className="w-20 p-2 font-medium text-white">Nama Depan</th>
            <th className="w-20 p-2 font-medium text-white">Nama Belakang</th>
            <th className="w-40 p-2 font-medium text-white">Email</th>
            <th className="w-32 p-2 font-medium text-white">Nomor Telepon</th>
            <th className="w-20 p-2 font-medium text-white">Bank</th>
            <th className="w-32 p-2 font-medium text-white">Nomor Kartu</th>
            <th className="w-40 p-2 font-medium text-white">NIK</th>
            <th className="w-56 p-2 font-medium text-white">KTP </th>
            <th className="w-40 p-2 font-medium text-white">Status</th>
            <th className="w-40 p-2 font-medium text-white">Edit Status</th>
          </tr>
        </thead>

        <tbody className="table-body">
          {isFetched &&
            owners &&
            (owners.length !== 0 ? (
              owners.map((o) => {
                return (
                  <tr className="flex w-full items-center" key={o.owner_id}>
                    <td className="w-10 p-2">{o.owner_id}</td>
                    <td className="w-20 break-words p-2">
                      {o.user.first_name}
                    </td>
                    <td className="w-20 break-words p-2">{o.user.last_name}</td>
                    <td className="w-40 break-words p-2">{o.user.email}</td>
                    <td className="w-32 break-words p-2">
                      {o.user.phone_number}
                    </td>
                    <td className="w-20 break-words p-2">{o.bank_name}</td>
                    <td className="w-32 break-words p-2">{o.card_number}</td>
                    <td className="w-40 break-words p-2">{o.nik}</td>
                    <td className="w-56 p-2">
                      <Image
                        alt={`ktp ${o.user.first_name} ${o.user.last_name}`}
                        src={o.ktp_picture}
                        width={200}
                        height={200}
                        style={{
                          width: "auto",
                          height: "100%",
                        }}
                        priority
                        className="rounded-sm"
                      />
                    </td>
                    <td className="w-40 p-2">
                      {StatusBlockColor(
                        o.status,
                        "rounded-full px-6 py-3 text-center",
                      )}
                    </td>
                    <td className="w-40 p-2">
                      {StatusBlockColor(
                        "ADMIN",
                        "rounded-full px-6 py-3 text-center",
                        o.owner_id,
                        approvePenyedia,
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="flex w-full">
                <td className="grid w-full justify-center p-4">Data Kosong</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}
