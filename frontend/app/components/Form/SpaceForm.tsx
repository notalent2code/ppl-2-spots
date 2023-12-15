"use client";

import Checkbox, { CheckboxesLoad } from "@/app/components/Form/Checkbox";
import MapVisualization from "@/app/components/MapVisualization";
import { SpaceResultDetail } from "@/app/lib/apiCalls/getSpaceByID";
import useApiSecured from "@/app/lib/hooks/useApiSecured";
import { AxiosError } from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Facilities = {
  facility_id: number;
  name: string;
  descripttion: string;
};

export default function SpaceForm({
  spaceData,
}: {
  spaceData?: SpaceResultDetail;
}) {
  const { push } = useRouter();
  const { spaceId } = useParams();
  const path = usePathname();
  const axiosSecured = useApiSecured();

  const [allFacilities, setAllFacilities] = useState<Facilities[] | null>(null);

  const [name, setName] = useState(spaceData ? spaceData.name : "");
  const [desc, setDesc] = useState(spaceData ? spaceData.description : "");
  const [price, setPrice] = useState(spaceData ? spaceData.price : "");
  const [capacity, setCapacity] = useState(
    spaceData ? spaceData.capacity.toString() : "",
  );
  const [address, setAddress] = useState(
    spaceData ? spaceData.location.address : "",
  );
  const [latitude, setLatitude] = useState(
    spaceData ? spaceData.location.latitude : -6.919868442060335,
  );
  const [longitude, setLongitude] = useState(
    spaceData ? spaceData.location.longitude : 107.61790605727128,
  );
  const [images, setImages] = useState<FileList | null>(null);
  const [facilities, setFacilities] = useState<number[]>([]);

  useEffect(() => {
    async function getFacilities() {
      const response = await axiosSecured("/lib/apiCalls/owner/getFacilities");
      setAllFacilities(response.data.facilities[0]);
    }
    getFacilities();
  }, []);

  async function postSpace() {
    try {
      const form = new FormData();

      if (name !== spaceData?.name) form.append("name", name);
      if (desc !== spaceData?.description) form.append("description", desc);
      if (price !== spaceData?.price) form.append("price", price);
      if (
        capacity !== spaceData?.capacity.toString() &&
        capacity !== "0" &&
        capacity !== ""
      )
        form.append("capacity", capacity);
      if (address !== spaceData?.location.address)
        form.append("address", address);
      if (latitude !== spaceData?.location.latitude)
        form.append("latitude", latitude.toString());
      if (longitude !== spaceData?.location.longitude)
        form.append("longitude", longitude.toString());
      if (images) {
        for (let i = 0; i < images.length; i++) {
          form.append("spaceURLs", images[i]);
        }
      }
      if (facilities.length !== 0) form.append("facilities", `${facilities}`);

      const response = path.startsWith("/owner/edit")
        ? await axiosSecured.put(
            `/lib/apiCalls/coworking-space?id=${spaceId}`,
            form,
          )
        : await axiosSecured.post("/lib/apiCalls/coworking-space", form);

      if (response.status === 201 || response.status === 200) {
        toast.success("Data berhasil diunggah");
        setTimeout(() => push("/owner/coworking-space"), 200);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.statusText === "Payload Too Large") {
        toast.error("Ukuran foto harus dibawah 5 MB");
      } else if (
        // @ts-ignore
        err.response.data.message === "Can't find variable: oldImage"
      ) {
        toast.error("Tidak bisa upload format foto");
      } else toast.error("Updata gagal, cek kembali data");
    }
  }

  const handleCheckboxes = (e: any) => {
    const { value, checked } = e.target;
    const val = parseInt(value);

    if (checked) {
      setFacilities([...facilities, val]);
    } else {
      setFacilities(facilities.filter((element) => element !== val));
    }
  };

  const handleCoordinates = useCallback(
    ({ lat, lng }: { lat: number; lng: number }) => {
      setLatitude(lat);
      setLongitude(lng);
    },
    [],
  );

  return (
    <form
      className="mb-8 rounded-xl border border-gray-300 shadow-lg"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (capacity === "" || capacity === "0" || /[^\d]/.test(capacity)) {
          toast.error("Kapasitas tidak valid");
          return;
        }
        postSpace();
      }}
    >
      <div className="flex justify-center px-8">
        <div className="flex w-full items-center justify-center">
          <p className="w-3/12 text-xl text-black">Nama Tempat</p>
          <input
            type="text"
            className="my-5 mr-0 w-9/12 rounded-xl border px-2 py-2 text-left text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex justify-center px-8">
        <div className="flex w-full items-center justify-center">
          <p className="w-3/12 text-xl text-black">Deskripsi</p>
          <textarea
            className="my-5 mr-0 h-32 w-9/12 rounded-xl border px-2 py-2 text-left text-black"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex justify-center px-8">
        <div className="flex w-full items-center justify-center">
          <p className="w-3/12 text-xl text-black">Harga per jam</p>
          <input
            type="number"
            className="my-5 mr-0 w-9/12 rounded-xl border px-2 py-2 text-left text-black"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex justify-center px-8">
        <div className="flex w-full items-center justify-center">
          <p className="w-3/12 text-xl text-black">Kapasitas orang</p>
          <input
            type="number"
            className="my-5 mr-0 w-9/12 rounded-xl border px-2 py-2 text-left text-black"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex justify-center px-8">
        <div className="flex w-full items-center justify-center">
          <p className="w-3/12 text-xl text-black">Alamat Kota</p>
          <input
            type="text"
            className="my-5 mr-0 w-9/12 rounded-xl border px-2 py-2 text-left text-black"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex justify-center px-8">
        <div className="flex w-full items-center justify-center">
          <p className="w-3/12 text-xl text-black">Foto</p>
          <div className="my-5 mr-0 h-20 w-9/12 rounded-xl border-2 border-dashed border-darkblue bg-slate-300">
            <input
              type="file"
              className="h-full w-full p-6 text-black"
              onChange={(e: any) => setImages(e.target.files)}
              accept=".jpg, .jpeg, .png"
              required={path.startsWith("/owner/edit") ? false : true}
              multiple
            />
          </div>
        </div>
      </div>

      <div className="my-5 px-8">
        <p className="mb-6 w-4/12 text-xl">Fasilitas tempat</p>

        <div className="grid w-full grid-cols-1 items-center justify-center gap-2 text-black sm:grid-cols-2 lg:grid-cols-3">
          {allFacilities ? (
            allFacilities.map((facs) => {
              return (
                <Checkbox
                  key={facs.facility_id}
                  value={facs.facility_id}
                  label={facs.name}
                  checkboxHandler={handleCheckboxes}
                />
              );
            })
          ) : (
            <CheckboxesLoad />
          )}
        </div>
      </div>

      <div className="mt-8 px-8">
        <p className="text-xl">Posisi Tempat</p>
        <MapVisualization
          lat={latitude}
          lng={longitude}
          draggable={true}
          label=""
          style="h-full w-full rounded-xl bg-white p-4"
          coordinatesFetcher={handleCoordinates}
        />
      </div>

      <div className="flex justify-evenly">
        <button
          className="button-color-state m-4 block w-fit bg-green-700 p-3 px-20 py-3 text-white hover:bg-green-500 active:bg-teal-600"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
