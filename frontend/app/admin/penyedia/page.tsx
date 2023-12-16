"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import useApiSecured from "@/app/lib/hooks/useApiSecured";
import { Owner } from "@/app/owner/page";
import StatusBlockColor from "@/app/components/StatusBlockColor";
import toast from "react-hot-toast";

export default function AdminPenyedia() {
  const axiosSecured = useApiSecured();

  const [isFetched, setIsFetched] = useState(false);
  const [owners, setOwners] = useState<Owner[] | null>(null);
  const [updatedOwner, setUpdatedOwner] = useState<Owner | null>(null);

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
  }, [updatedOwner]);

  async function approvePenyedia(owner_id: number, approval: boolean) {
    const status = approval ? "APPROVED" : "REJECTED";

    try {
      const response = await axiosSecured.put("/lib/apiCalls/admin/getOwner", {
        id: owner_id,
        status: status,
      });
      setUpdatedOwner(response.data.owner);
      toast.success("Verifikasi berhasil");
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
            <th className="w-24 p-2 font-medium text-white">Owner ID</th>
            <th className="w-36 p-2 font-medium text-white">Nama Depan</th>
            <th className="w-36 p-2 font-medium text-white">Nama Belakang</th>
            <th className="w-52 p-2 font-medium text-white">Email</th>
            <th className="w-36 p-2 font-medium text-white">Nomor Telepon</th>
            <th className="w-32 p-2 font-medium text-white">Bank</th>
            <th className="w-64 p-2 font-medium text-white">Nomor Kartu</th>
            <th className="w-52 p-2 font-medium text-white">NIK</th>
            <th className="w-56 p-2 font-medium text-white">KTP </th>
            <th className="w-40 p-2 font-medium text-white">Status</th>
            <th className="w-40 p-2 font-medium text-white">Edit Status</th>
          </tr>
        </thead>

        <tbody className="table-body">
          {isFetched ? (
            owners &&
            (owners.length !== 0 ? (
              owners.map((o) => {
                return (
                  <tr className="flex w-full items-center" key={o.owner_id}>
                    <td className="w-24 p-2">{o.owner_id}</td>
                    <td className="w-36 break-words p-2">
                      {o.user.first_name}
                    </td>
                    <td className="w-36 break-words p-2">{o.user.last_name}</td>
                    <td className="w-52 break-words p-2">{o.user.email}</td>
                    <td className="w-36 break-words p-2">
                      {o.user.phone_number}
                    </td>
                    <td className="w-32 break-words p-2">{o.bank_name}</td>
                    <td className="w-64 break-words p-2">{o.card_number}</td>
                    <td className="w-52 break-words p-2">{o.nik}</td>
                    <td className="w-56 p-2">
                      {o.ktp_picture && (
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
                          className="mx-auto aspect-video rounded-sm object-cover"
                        />
                      )}
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
            ))
          ) : (
            <>
              <div className="m-4 mt-6 h-8 w-11/12 animate-pulse rounded-lg bg-slate-200"></div>
              <div className="m-4 h-8 w-11/12 animate-pulse rounded-lg bg-slate-200"></div>
              <div className="m-4 h-8 w-11/12 animate-pulse rounded-lg bg-slate-200"></div>
            </>
          )}
        </tbody>
      </table>
    </section>
  );
}
