"use client";

import SpaceTable from "@/app/components/Table/SpaceTable";

export default function SpaceOwner() {
  return (
    <section className="table-section">
      <title>Coworking Space Anda</title>

      <h1 className="table-h1">Data Coworking Space Anda</h1>

      <SpaceTable userType="OWNER" />
    </section>
  );
}
