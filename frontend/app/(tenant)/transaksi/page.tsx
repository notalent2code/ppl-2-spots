"use client";

import getSpaceByID from "@/app/lib/apiCalls/getSpaceByID";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import moneySplitter from "@/app/lib/moneySplitter";
import useApiSecured from "@/app/lib/hooks/useApiSecured";
import toast from "react-hot-toast";
import { useSpaceIdInfoContext } from "@/app/lib/hooks/useSpaceIdInfo";
import { useEffect, useState } from "react";

export default function Booking(id: number) {
  const router = useRouter();
  const searchParams = useSearchParams();
  if (
    !searchParams.get("spaceId") ||
    !searchParams.get("bookingId") ||
    !searchParams.get("name") ||
    !searchParams.get("date") ||
    !searchParams.get("end") ||
    !searchParams.get("start") ||
    !searchParams.get("spacePrice")
  ) {
    router.back();
  }

  const axiosSecured = useApiSecured();
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

  const { image } = useSpaceIdInfoContext();
  const [backupImage, setBackupImage] = useState<string | null>(null);

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

  useEffect(() => {
    async function getBackupPicture() {
      //@ts-ignore
      const response = await getSpaceByID(paramsProps.spaceId);
      setBackupImage(response.coworking_space_images[0].image_url);
    }

    if (!image) getBackupPicture();
  }, []);

  return (
    <>
      <title>Transaksi</title>

      <h1>Transaksi</h1>

      <p className="text-l bg-white px-6 pb-8 text-black md:px-12">
        Teliti kembali sebelum lanjut ke pembayaran
      </p>

      <form
        className="m-auto mb-5"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          payment();
        }}
      >
        <div className="m-auto grid w-11/12 items-center rounded-xl border-2 border-dashed border-black py-5 lg:grid-cols-2">
          <div className="px-10">
            <h2 className="mb-20 mt-6 text-center text-2xl font-bold text-darkblue">
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
              <p className="w-2/6 text-lg font-semibold text-black">
                Waktu Sewa
              </p>
              <p className="w-1/6 text-center text-lg font-semibold text-black">
                :
              </p>
              <p id="" className="w-3/6 text-lg font-semibold text-black">
                {paramsProps.startHour}:00 - {paramsProps.endHour}:00
              </p>
            </div>

            <div className="my-3 flex justify-between">
              <p className="w-2/6 text-lg font-semibold text-black">
                Lama Sewa
              </p>
              <p className="w-1/6 text-center text-lg font-semibold text-black">
                :
              </p>
              <p id="" className="w-3/6 text-lg font-semibold text-black">
                {bookingDuration} Jam
              </p>
            </div>

            <div className="my-3 flex justify-between">
              <p className="w-2/6 text-lg font-semibold text-black">
                Biaya Sewa
              </p>
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

          <div className="my-6 flex h-60 flex-col items-center lg:h-full">
            {image || backupImage ? (
              <Image
                alt="room"
                className="my-auto aspect-video w-60 rounded-xl object-cover sm:w-80 md:w-96 lg:w-5/6 lg:pr-10"
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
        </div>

        <div className="flex flex-col items-center sm:flex-row">
          <button
            type="submit"
            className="m-auto mt-10 block rounded-full bg-darkblue px-20
            py-3 text-center font-semibold text-white hover:bg-teal-700"
          >
            Bayar
          </button>

          <Link
            type="submit"
            className="m-auto mt-10 block rounded-full bg-gray-200 px-20
            py-3 text-center font-semibold hover:bg-blue-400"
            href="/eksplorasi"
          >
            Batal
          </Link>
        </div>
      </form>
    </>
  );
}
