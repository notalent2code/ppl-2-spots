"use client";

import StatusBlockColor from "@/app/components/StatusBlockColor";
import getAllSpace, { CoworkingSpace } from "@/app/lib/apiCalls/getAllSpace";
import useApiSecured from "@/app/lib/hooks/useApiSecured";
import moneySplitter from "@/app/lib/moneySplitter";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SpaceTable({
  userType,
  dependencie,
  editFunction,
}: {
  userType: string;
  dependencie?: any;
  editFunction?: (...args: any) => any;
}) {
  const axiosSecured = useApiSecured();

  const [isFetched, setIsFetched] = useState(false);
  const [spaces, setSpaces] = useState<CoworkingSpace[] | null>(null);

  useEffect(() => {
    async function getCoworkingSpace() {
      const result = await axiosSecured("/lib/apiCalls/coworking-space");
      const [spaceResult, pagination] = result.data.coworkingSpaces;
      setSpaces(spaceResult);
      setIsFetched(true);
    }
    getCoworkingSpace();
  }, [dependencie]);

  return (
    <table className="table-container h-5/6 ">
      <thead className="table-head">
        <tr className="flex w-full items-center rounded-tl-xl rounded-tr-xl bg-darkgray text-center">
          <th className="w-20 p-2 font-medium text-white">Space ID</th>
          <th className="w-52 p-2 font-medium text-white">Nama</th>
          <th className="w-36 p-2 font-medium text-white">Harga Sewa</th>
          <th className="w-20 p-2 font-medium text-white">Kapasitas</th>
          <th className="w-44 p-2 font-medium text-white">Lokasi</th>
          <th className="w-40 p-2 font-medium text-white">Lat, Long</th>
          <th className="w-60 p-2 font-medium text-white">Foto</th>
          <th className="w-40 p-2 font-medium text-white">Status</th>
          <th className="w-40 p-2 font-medium text-white">Edit</th>
        </tr>
      </thead>

      <tbody className="table-body">
        {isFetched ? (
          spaces &&
          (spaces.length !== 0 ? (
            spaces.map((s) => {
              return (
                <tr className="flex w-full items-center" key={s.space_id}>
                  <td className="w-20 break-words p-2">{s.space_id}</td>
                  <td className="w-52 break-words p-2">{s.name}</td>
                  <td className="w-36 break-words p-2">
                    Rp {moneySplitter(s.price.toString())}
                  </td>
                  <td className="w-20 break-words p-2">{s.capacity}</td>
                  <td className="w-44 break-words p-2">{s.location.address}</td>
                  <td className="w-40 p-2">
                    {s.location.latitude} , {s.location.longitude}
                  </td>
                  <td className="w-60 p-2">
                    <Image
                      alt={`space ${s.name}`}
                      src={s.coworking_space_images[0].image_url}
                      width={200}
                      height={200}
                      style={{
                        width: "auto",
                        height: "100%",
                      }}
                      priority
                      className="mx-auto aspect-video rounded-md object-cover"
                    />
                  </td>
                  <td className="w-40 p-2">
                    {StatusBlockColor(
                      s.status,
                      "rounded-full px-6 py-3 text-center",
                    )}
                  </td>
                  <td className="w-40 p-2">
                    {StatusBlockColor(
                      userType,
                      "rounded-full px-6 py-3 text-center",
                      s.space_id,
                      editFunction,
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="flex h-full w-full items-center">
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
  );
}
