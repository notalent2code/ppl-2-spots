"use client";

import SpaceTable from "@/app/components/Table/SpaceTable";
import useApiSecured from "@/app/lib/hooks/useApiSecured";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminCoworkingSpace() {
  // const { refresh } = useRouter();
  const axiosSecured = useApiSecured();

  async function verifySpace(space_id: number, approval: boolean) {
    const status = approval ? "APPROVED" : "REJECTED";

    try {
      await axiosSecured.put("/lib/apiCalls/admin/verifySpace", {
        id: space_id,
        status: status,
      });
      toast.success("Verifikasi berhasil");
      setTimeout(() => location.reload(), 400);
      // setTimeout(() => refresh(), 200);
    } catch (error) {
      toast.error("Verifikasi gagal");
    }
  }

  return (
    <section className="table-section">
      <title>Data Coworking Space</title>

      <h1 className="table-h1">Data Coworking Space</h1>

      <SpaceTable userType="ADMIN" editFunction={verifySpace} />
    </section>
  );
}
