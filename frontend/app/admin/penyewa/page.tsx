"use client";

import useApiSecured from "@/app/lib/hooks/useApiSecured";
import { ProfileType } from "@/app/lib/hooks/useUserInfoContext";
import { AxiosError } from "axios";
import { useState, useEffect } from "react";

type Tenant = ProfileType & {
  tenant_id: number;
};

export default function AdminPenyewa() {
  const axiosSecured = useApiSecured();

  const [isFetched, setIsFetched] = useState(false);
  const [tenants, setTenants] = useState<Tenant[] | null>(null);

  useEffect(() => {
    async function getTenants() {
      try {
        const response = await axiosSecured("/lib/apiCalls/admin/getTenants");

        setTenants(response.data.tenants);
        setIsFetched(true);
      } catch (error) {
        const err = error as AxiosError;
      }
    }

    getTenants();
  }, []);

  return (
    <section className="table-section">
      <title>Data Penyewa</title>

      <h1 className="table-h1">Data Penyewa</h1>

      <table className="table-container h-5/6 w-full">
        <thead className="table-head">
          <tr className="flex h-full w-full items-center rounded-tl-xl rounded-tr-xl bg-darkgray text-center">
            <th className="w-24 flex-auto p-2 font-medium text-white lg:w-1/12">
              Tenant ID
            </th>
            <th className="w-36 p-2 font-medium text-white lg:w-2/12">
              Nama Depan
            </th>
            <th className="w-36 p-2 font-medium text-white lg:w-2/12">
              Nama Belakang
            </th>
            <th className="w-64 p-2 font-medium text-white lg:w-4/12">Email</th>
            <th className="w-36 p-2 font-medium text-white lg:w-3/12">
              Nomor Telepon
            </th>
          </tr>
        </thead>

        <tbody className="table-body">
          {isFetched &&
            tenants &&
            (tenants.length !== 0 ? (
              tenants.map((t) => {
                return (
                  <tr className="item-center flex w-full" key={t.tenant_id}>
                    <td className="w-24 break-words p-2 lg:w-1/12">
                      {t.tenant_id}
                    </td>

                    <td className="w-36 break-words p-2 lg:w-2/12">
                      {t.user.first_name}
                    </td>

                    <td className="w-36 break-words p-2 lg:w-2/12">
                      {t.user.last_name}
                    </td>

                    <td className="w-64 break-words p-2 lg:w-4/12">
                      {t.user.email}
                    </td>

                    <td className="w-36 break-words p-2 lg:w-3/12">
                      {t.user.phone_number}
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
