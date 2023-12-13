"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import getSpaceByID from "@/app/lib/apiCalls/getSpaceByID";
import useApiSecured from "@/app/lib/hooks/useApiSecured";
import { useSpaceIdInfoContext } from "@/app/lib/hooks/useSpaceIdInfoContext";
import moneySplitter from "@/app/lib/moneySplitter";
import toast from "react-hot-toast";

export default function Booking(id: number) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const axiosSecured = useApiSecured();
  const { image } = useSpaceIdInfoContext();

  const [backupImage, setBackupImage] = useState<string | null>(null);

  useEffect(() => {
    async function getBackupPicture() {
      if (!paramsProps?.spaceId) return;
      const response = await getSpaceByID(parseInt(paramsProps.spaceId));
      setBackupImage(response.coworking_space_images[0].image_url);
    }

    if (!image) getBackupPicture();
  }, []);

  if (
    !searchParams.get("spaceId") ||
    !searchParams.get("bookingId") ||
    !searchParams.get("name") ||
    !searchParams.get("date") ||
    !searchParams.get("end") ||
    !searchParams.get("start") ||
    !searchParams.get("spacePrice")
  )
    return router.back();

  const paramsProps = {
    spaceId: searchParams.get("spaceId"),
    bookingId: searchParams.get("bookingId"),
    spaceName: searchParams.get("name"),
    date: searchParams.get("date"),
    startHour: searchParams.get("start") ?? "0",
    endHour: searchParams.get("end") ?? "0",
    spacePrice: searchParams.get("spacePrice") ?? "0",
  };

  const bookingDuration =
    parseInt(paramsProps.endHour) - parseInt(paramsProps.startHour);
  const totalPrice = bookingDuration * parseInt(paramsProps.spacePrice);

  async function payment() {
    try {
      const response = await axiosSecured.post(
        `/lib/apiCalls/payment?bookingId=${paramsProps.bookingId}`,
      );

      if (response.status === 200)
        router.push(response.data.snapRes.redirect_url);
    } catch (error) {
      toast.error("Gagal melanjutkan ke pembayaran");
    }
  }

  return (
    <>
      <title>Transaksi</title>

      <h1>Transaksi</h1>

      <p className="text-l bg-white px-6 pb-8 text-black md:px-12">
        Teliti kembali sebelum lanjut ke pembayaran
      </p>

      <form
        className="m-auto mb-8 grid w-11/12 items-center rounded-xl border-2 border-dashed border-black py-5 lg:grid-cols-2"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          payment();
        }}
      >
        <div className="px-6 pt-5 sm:px-10">
          <h2 className="mb-8 text-center text-2xl font-bold text-darkblue">
            Detail Transaksi
          </h2>
          <div className="my-3 flex justify-between">
            <p className="w-2/6 text-lg font-semibold text-black">
              Nama Coworking Space
            </p>
            <p className="w-1/6 text-center text-lg font-semibold text-black">
              :
            </p>
            <p id="" className="w-3/6 text-lg font-semibold text-black">
              {paramsProps.spaceName}
            </p>
          </div>

          <div className="my-3 flex justify-between">
            <p className="w-2/6 text-lg font-semibold text-black ">Tanggal</p>
            <p className="w-1/6 text-center text-lg font-semibold text-black">
              :
            </p>
            <p id="" className="w-3/6 text-lg font-semibold text-black">
              {paramsProps.date}
            </p>
          </div>

          <div className="my-3 flex justify-between">
            <p className="w-2/6 text-lg font-semibold text-black">Waktu Sewa</p>
            <p className="w-1/6 text-center text-lg font-semibold text-black">
              :
            </p>
            <p id="" className="w-3/6 text-lg font-semibold text-black">
              {paramsProps.startHour}:00 - {paramsProps.endHour}:00
            </p>
          </div>

          <div className="my-3 flex justify-between">
            <p className="w-2/6 text-lg font-semibold text-black">Lama Sewa</p>
            <p className="w-1/6 text-center text-lg font-semibold text-black">
              :
            </p>
            <p id="" className="w-3/6 text-lg font-semibold text-black">
              {bookingDuration} Jam
            </p>
          </div>

          <div className="my-3 flex justify-between">
            <p className="w-2/6 text-lg font-semibold text-black">Biaya Sewa</p>
            <p className="w-1/6 text-center text-lg font-semibold text-black">
              :
            </p>
            <p id="" className="w-3/6 text-lg font-semibold text-black">
              Rp {moneySplitter(paramsProps.spacePrice)}
            </p>
          </div>

          <hr />

          <div className="my-8 flex justify-between">
            <p className="w-2/6 text-lg font-semibold text-black">
              Total Pembayaran
            </p>
            <p className="w-1/6 text-center text-lg font-semibold text-black">
              :
            </p>
            <p id="" className="w-3/6 text-lg font-semibold text-black">
              Rp {moneySplitter(totalPrice.toString())}
            </p>
          </div>
        </div>

        <div className="flex h-60 flex-col items-center lg:h-full">
          {image || backupImage ? (
            <Image
              alt="room"
              className="my-auto aspect-video w-60 rounded-xl object-cover sm:w-80 md:w-96 lg:w-5/6"
              //@ts-ignore
              src={image ?? backupImage}
              width={500}
              height={500}
            />
          ) : (
            <div className="px-auto my-auto flex h-1/2 w-60 items-center rounded-xl bg-slate-200 sm:h-2/3 sm:w-80 lg:h-1/2 lg:w-5/6">
              <p className="mx-auto">Gagal memuat foto</p>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="button-color-state md:px-auto m-auto mt-6 block w-52 rounded-full bg-darkblue py-3 text-white focus:outline-2 focus:outline-green-600 lg:my-6"
        >
          Bayar
        </button>

        <Link
          type="submit"
          className="white-button-state md:px-auto m-auto mt-6 block w-52 rounded-full border-2 py-3 text-center font-semibold focus:outline-2 focus:outline-green-600 lg:my-6"
          href="/eksplorasi"
        >
          Batal
        </Link>
      </form>
    </>
  );
}
