"use client";

import SpaceForm from "@/app/components/Form/SpaceForm";

export default function AddSpace() {
  return (
    <section className="col-span-8 md:col-span-6">
      <title>Tambah Coworking Space</title>
      <div className="block max-h-screen overflow-auto px-8">
        <div className="h-1/12 flex justify-center">
          <h1>Tambah Coworking Space</h1>
        </div>

        <SpaceForm />
      </div>
    </section>
  );
}
