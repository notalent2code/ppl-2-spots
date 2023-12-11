"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useApiSecured from "@/app/lib/hooks/useApiSecured";
import moneySplitter from "@/app/lib/moneySplitter";
import MainLoading from "@/app/components/MainLoading";
import toast from "react-hot-toast";

export type BookingDetail = {
  booking_id: string;
  space_id: number;
  tenant_id: number;
  date: string;
  start_hour: number;
  end_hour: number;
  total_price: string;
  created_at: string;
  updated_at: string;
  coworking_space: {
    name: string;
  };
  payment?: {
    payment_id: string;
    method: string;
    amount: string;
    status: string;
  };
};

export default function BookingDetailCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  if (
    !searchParams.get("order_id")
    // !searchParams.get("status_code") ||
  ) {
    router.back();
  }
  const id = searchParams.get("order_id");
  const axiosSecured = useApiSecured();

  const [bookingDetail, setBookingDetail] = useState<BookingDetail | null>(
    null,
  );

  useEffect(() => {
    async function callbackDetail() {
      try {
        const response = await axiosSecured(
          `/lib/apiCalls/booking/callback?id=${id}`,
        );

        if (response.status === 200) {
          setBookingDetail(response.data.booking);
        }
      } catch (error) {
        toast.error("Terjadi masalah saat konfirmasi booking");
      }
    }

    callbackDetail();

    const script = document.createElement("script");

    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function download() {
    const element = document.getElementById("receipt");
    var opt = {
      margin: [0.5, 0],
      filename:
        "Spots_Booking_" +
        (bookingDetail?.coworking_space?.name ?? "") +
        (bookingDetail?.booking_id ?? "") +
        ".pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // @ts-ignore
    html2pdf().set(opt).from(element).save();
  }

  if (!bookingDetail)
    return (
      <div className="justtify-center my-10 block items-center py-20">
        <div className="mx-8 rounded-xl bg-white p-6 drop-shadow-md">
          <div className="flex items-center justify-center">
            <div className="m-2 h-36 w-36 rounded-2xl bg-slate-100"></div>
          </div>

          <div className="my-3 grid h-8 animate-pulse rounded-md bg-slate-200" />
          <div className="my-3 grid h-8 w-1/3 animate-pulse rounded-md bg-slate-200" />
          <div className="my-3 mb-12 grid h-8 w-2/3 animate-pulse rounded-md bg-slate-200" />

          <div className="my-3 grid h-8 animate-pulse rounded-md bg-slate-200" />
          <div className="my-3 grid h-8 w-2/5 animate-pulse rounded-md bg-slate-200" />
          <div className="my-3 grid h-8 w-1/3 animate-pulse rounded-md bg-slate-200" />
        </div>
      </div>
    );

  return (
    <>
      <title>Detail Booking</title>

      <h1>Detail Booking</h1>

      <strong className="text-l block bg-white px-6 pb-8 text-red-500 md:px-12">
        *simpan struk bila diperlukan, struk tidak dapat di akses lagi setelah
        meninggalkan laman ini
      </strong>

      <form
        className="m-auto mb-5"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          download();
        }}
      >
        <div
          id="receipt"
          className="m-auto grid w-11/12 items-center rounded-xl border-2 border-dashed border-black py-5"
        >
          <Image
            src={"/spots-white.svg"}
            width={150}
            height={150}
            alt="Spots-logo"
            className="mx-auto bg-darkblue"
          />

          <h2 className="my-6 text-center text-2xl font-bold text-darkblue">
            Struk Booking
          </h2>

          <div className="px-10">
            <div className="my-3 flex">
              <p className="w-5/12 text-sm font-semibold text-black sm:w-4/12 md:md:text-lg">
                Nomor Booking
              </p>
              <p className="w-1/12 text-center font-semibold text-black md:text-lg">
                :
              </p>
              <p
                id=""
                className="w-6/12 font-semibold text-black sm:w-7/12 md:md:text-lg"
              >
                {bookingDetail.booking_id}
              </p>
            </div>

            <div className="my-3 flex">
              <p className="w-5/12 text-sm font-semibold text-black sm:w-4/12 md:md:text-lg">
                Nama Coworking Space
              </p>
              <p className="w-1/12 text-center font-semibold text-black md:text-lg">
                :
              </p>
              <p
                id=""
                className="w-6/12 font-semibold text-black sm:w-7/12 md:text-lg"
              >
                {bookingDetail.coworking_space.name}
              </p>
            </div>

            <div className="my-3 flex">
              <p className="w-5/12 text-sm font-semibold text-black sm:w-4/12 md:text-lg ">
                Tanggal
              </p>
              <p className="w-1/12 text-center font-semibold text-black md:text-lg">
                :
              </p>
              <p
                id=""
                className="w-6/12 font-semibold text-black sm:w-7/12 md:text-lg"
              >
                {bookingDetail.date.replace(bookingDetail.date, (match) => {
                  const date = new Date(match);
                  return date.toDateString();
                })}
              </p>
            </div>

            <div className="my-3 flex">
              <p className="w-5/12 text-sm font-semibold text-black sm:w-4/12 md:text-lg">
                Waktu Sewa
              </p>
              <p className="w-1/12 text-center font-semibold text-black md:text-lg">
                :
              </p>
              <p
                id=""
                className="w-6/12 font-semibold text-black sm:w-7/12 md:text-lg"
              >
                {bookingDetail.start_hour}:00 - {bookingDetail.end_hour}:00
              </p>
            </div>

            <div className="my-3 flex">
              <p className="w-5/12 text-sm font-semibold text-black sm:w-4/12 md:text-lg">
                Dibuat Pada
              </p>
              <p className="w-1/12 text-center font-semibold text-black md:text-lg">
                :
              </p>
              <p
                id=""
                className="w-6/12 font-semibold text-black sm:w-7/12 md:text-lg"
              >
                {bookingDetail.created_at.replace(
                  bookingDetail.created_at,
                  (match) => {
                    const time = new Date(match);
                    return time.toLocaleString();
                  },
                )}
              </p>
            </div>

            <div className="my-3 flex">
              <p className="w-5/12 text-sm font-semibold text-black sm:w-4/12 md:text-lg">
                Biaya Sewa
              </p>
              <p className="w-1/12 text-center font-semibold text-black md:text-lg">
                :
              </p>
              <p
                id=""
                className="w-6/12 font-semibold text-black sm:w-7/12 md:text-lg"
              >
                Rp {moneySplitter(bookingDetail.total_price)}
              </p>
            </div>
          </div>

          <hr className="my-6" />

          <div className="px-10">
            <div className="my-3 flex">
              <p className="w-5/12 text-sm font-semibold text-black sm:w-4/12 md:text-lg">
                Nomor Pembayaran
              </p>
              <p className="w-1/12 text-center font-semibold text-black md:text-lg">
                :
              </p>
              <p
                id=""
                className="w-6/12 font-semibold text-black sm:w-7/12 md:text-lg"
              >
                {bookingDetail?.payment?.payment_id ?? "-"}
              </p>
            </div>

            <div className="my-3 flex">
              <p className="w-5/12 text-sm font-semibold text-black sm:w-4/12 md:text-lg">
                Metode Pembayaran
              </p>
              <p className="w-1/12 text-center font-semibold text-black md:text-lg">
                :
              </p>
              <p
                id=""
                className="w-6/12 font-semibold text-black sm:w-7/12 md:text-lg"
              >
                {bookingDetail?.payment?.method ?? "-"}
              </p>
            </div>

            <div className="my-3 flex">
              <p className="w-5/12 text-sm font-semibold text-black sm:w-4/12 md:text-lg">
                Status Pembayaran
              </p>
              <p className="w-1/12 text-center font-semibold text-black md:text-lg">
                :
              </p>
              <p
                id=""
                className="w-6/12 font-semibold text-black sm:w-7/12 md:text-lg"
              >
                {bookingDetail?.payment?.status ?? "-"}
              </p>
            </div>

            <div className="my-3 flex">
              <p className="w-5/12 text-sm font-semibold text-black sm:w-4/12 md:text-lg">
                Total Pembayaran
              </p>
              <p className="w-1/12 text-center font-semibold text-black md:text-lg">
                :
              </p>
              <p
                id=""
                className="w-6/12 font-semibold text-black sm:w-7/12 md:text-lg"
              >
                Rp {moneySplitter(bookingDetail?.payment?.amount ?? "-")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid items-center justify-center md:flex md:gap-x-28">
          <button
            type="submit"
            className="mt-10 block w-48 rounded-full bg-darkblue
            py-3 text-center font-semibold text-white hover:bg-teal-700"
          >
            Download
          </button>

          <Link
            type="submit"
            className="mt-10 block w-48 rounded-full bg-gray-200
            py-3 text-center font-semibold hover:bg-blue-400"
            href="/riwayat-booking"
          >
            Riwayat Booking
          </Link>
        </div>
      </form>
    </>
  );
}
