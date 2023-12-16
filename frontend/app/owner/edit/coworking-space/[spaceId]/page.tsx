"use client";

import SpaceForm from "@/app/components/Form/SpaceForm";
import OwnerFormLoading from "@/app/components/OwnerFormLoading";
import getSpaceByID, {
  SpaceResultDetail,
} from "@/app/lib/apiCalls/getSpaceByID";
import useApiSecured from "@/app/lib/hooks/useApiSecured";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function EditSpace({ params }: { params: { spaceId: number } }) {
  const axiosSecured = useApiSecured();
  const [spaceData, setSpaceData] = useState<SpaceResultDetail | null>(null);

  useEffect(() => {
    async function getSpaceById() {
      try {
        const response = await axiosSecured(
          `/lib/apiCalls/coworking-space/getByID?id=${params.spaceId}`,
        );
        setSpaceData(response.data.coworkingSpace);
      } catch (error) {
        toast.error("Error saat mengambil data");
      }
    }

    getSpaceById();
  }, []);

  return (
    <section className="col-span-8 md:col-span-6">
      <title>Edit Coworking Space</title>
      <div className="block max-h-screen overflow-auto px-8">
        <div className="h-1/12 flex justify-center">
          <h1>EDIT COWORKING SPACE</h1>
        </div>

        {spaceData ? <SpaceForm spaceData={spaceData} /> : <OwnerFormLoading />}
      </div>
    </section>
  );
}
