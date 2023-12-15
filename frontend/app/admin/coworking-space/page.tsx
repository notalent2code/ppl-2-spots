"use client";

import { useState } from "react";
import SpaceTable from "@/app/components/Table/SpaceTable";
import useApiSecured from "@/app/lib/hooks/useApiSecured";
import toast from "react-hot-toast";

export default function AdminCoworkingSpace() {
  const axiosSecured = useApiSecured();
  const [updatedSpace, setUpdatedSpace] = useState<any>(null);

  async function verifySpace(space_id: number, approval: boolean) {
    const status = approval ? "APPROVED" : "REJECTED";

    try {
      const response = await axiosSecured.put(
        "/lib/apiCalls/admin/verifySpace",
        {
          id: space_id,
          status: status,
        },
      );
      toast.success("Verifikasi berhasil");
      setUpdatedSpace(response.data.coworkingSpace);
      // setTimeout(() => location.reload(), 400);
    } catch (error) {
      toast.error("Verifikasi gagal");
    }
  }

  return (
    <section className="table-section">
      <title>Data Coworking Space</title>

      <h1 className="table-h1">Data Coworking Space</h1>

      <SpaceTable
        userType="ADMIN"
        dependencie={updatedSpace}
        editFunction={verifySpace}
      />
    </section>
  );
}
