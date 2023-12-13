"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useApiSecured from "@/app/lib/hooks/useApiSecured";
import {
  Availabilities,
  useSpaceIdInfoContext,
} from "@/app/lib/hooks/useSpaceIdInfoContext";
import getSpaceByID from "@/app/lib/apiCalls/getSpaceByID";
import { remapAvailabilities } from "../../detail/[spaceId]/ClientView";
import CalendarView from "@/app/components/CalendarView";
import toast from "react-hot-toast";
import * as NProgress from "nprogress";
import { AxiosError } from "axios";

export default function Booking({ params }: { params: { spaceId: number } }) {
  const axiosSecured = useApiSecured();
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const price = searchParams.get("price");
  if (!name || !price) router.back();
  NProgress.done();

  const { schedule } = useSpaceIdInfoContext();
  const [backupSchedule, setBackupSchedule] = useState<Availabilities | null>(
    null,
  );

  const time = new Date();

  const [date, setDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");

  async function submitBooking() {
    try {
      const totalPrice =
        (parseInt(endHour) - parseInt(startHour)) * parseInt(price || "0");
      const response = await axiosSecured.post(
        `/lib/apiCalls/booking?id=${params.spaceId}`,
        {
          date: date,
          startHour: startHour,
          endHour: endHour,
          totalPrice: totalPrice,
        },
      );

      const bookingDetail = response.data.data.booking;

      const path = `/transaksi?bookingId=${bookingDetail.booking_id}&date=${bookingDetail.date}&start=${bookingDetail.start_hour}&end=${bookingDetail.end_hour}&name=${name}&spacePrice=${price}&spaceId=${params.spaceId}`;

      if (response.status === 200) {
        toast.success("Booking berhasil dikirim");
        router.push(path);
      }
    } catch (error) {
      const err = error as AxiosError;
      const message =
        //@ts-ignore
        err.response?.data?.message === "Invalid booking time"
          ? "Waktu telah di booking"
          : "Gagal booking";
      toast.error(message);
    }
  }

  useEffect(() => {
    async function getBackupPicture() {
      const response = await getSpaceByID(params.spaceId);
      const availabilitesArray = response.availabilities?.map((value) => {
        return remapAvailabilities(value);
      });
      setBackupSchedule(availabilitesArray ?? []);
    }
    if (!schedule) getBackupPicture();
  }, []);

  return (
    <>
      <title>Booking</title>

      <h1>Booking Workspace</h1>

      <p className="text-l bg-white pb-8 pl-6 text-black md:pl-12">
        Mohon cek ulang data yang dimasukkan
      </p>

      <form
        className="m-auto mb-8 grid w-11/12 items-center rounded-xl border-2 border-dashed border-black py-5 lg:grid-cols-2"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (parseInt(startHour) >= parseInt(endHour)) {
            toast.error("Jam awal dan akhir valid");
            // cek apakah waktu telah berlalu dari waktu saat ini
          } else if (Date.parse(`${date} ${startHour}:00`) < time.valueOf()) {
            toast.error("Waktu tidak valid/telah berlalu");
          } else {
            submitBooking();
          }
        }}
      >
        <div className="px-6 py-5 sm:px-10">
          <p className="mb-10 mt-6 text-2xl font-bold text-darkblue">
            Data Booking
          </p>
          <div className="my-3 flex items-center justify-between">
            <p className="text-lg font-semibold text-black">
              Nama Coworking Space
            </p>
            <p className="mx-4 text-lg font-semibold text-black">:</p>
            <p className="text-lg font-semibold text-black">{name}</p>
          </div>

          <p className="text-lg font-semibold text-black">Tanggal</p>
          <div className="flex flex-row items-center">
            <input
              type="date"
              className="my-3 w-full rounded-2xl border border-darkblue bg-slate-100 bg-transparent px-4 py-2 text-left text-black"
              placeholder="Pilih Tanggal"
              required
              onChange={(e: any) => setDate(e.target.value)}
            ></input>
          </div>

          <div className="flex justify-between">
            <p className="w-1/2 text-lg font-semibold text-black">Jam Masuk</p>
            <p className="w-1/2 pl-4 text-lg font-semibold text-black">
              Jam Keluar
            </p>
          </div>

          <div className="flex justify-between">
            <div className="flex w-full flex-row items-center pr-4">
              <input
                type="number"
                id="startHour"
                className="my-3 w-full rounded-2xl border border-darkblue bg-slate-100 bg-transparent px-4 py-2 text-left text-black "
                placeholder="Pilih Waktu Masuk"
                min="8"
                max="16"
                required
                onChange={(e: any) => setStartHour(e.target.value)}
              ></input>
            </div>
            <div className="flex w-full flex-row items-center pl-4">
              <input
                type="number"
                id="endHour"
                className="my-3 w-full rounded-2xl border border-darkblue bg-slate-100 bg-transparent px-4 py-2 text-left text-black"
                placeholder="Pilih Waktu Keluar"
                min="9"
                max="17"
                required
                onChange={(e: any) => setEndHour(e.target.value)}
              ></input>
            </div>
          </div>
        </div>

        <div className="right flex flex-col items-center">
          <div className="mt-10 flex w-full justify-center rounded-full px-10 md:pr-10">
            {schedule || backupSchedule ? (
              <CalendarView bookedScheduleProps={schedule ?? backupSchedule} />
            ) : (
              <div className="m-4 h-64 w-48 rounded-xl bg-white drop-shadow-md md:m-10 md:w-80">
                <div className="h-12 w-full animate-none rounded-t-xl bg-darkblue" />
                <div className="mx-auto my-4 h-2/3 w-5/6 animate-pulse rounded bg-slate-100" />
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="button-color-state md:px-auto m-auto mt-6 block w-52 rounded-full bg-darkblue py-3 text-white focus:outline-2 focus:outline-green-600 lg:my-6"
        >
          Kirim Booking
        </button>

        <button
          className="white-button-state md:px-auto m-auto mt-6 block w-52 rounded-full border-2 py-3 focus:outline-2 focus:outline-green-600 lg:my-6"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            router.back();
          }}
        >
          Kembali
        </button>
      </form>
    </>
  );
}
