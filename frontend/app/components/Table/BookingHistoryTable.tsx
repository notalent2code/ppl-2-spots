"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import useApiSecured from "@/app/lib/hooks/useApiSecured";
import StatusBlockColor from "@/app/components/StatusBlockColor";
import moneySplitter from "@/app/lib/moneySplitter";
import toast from "react-hot-toast";

export interface BookingHistory {
  booking_id: string;
  date: string;
  coworking_space: {
    name: string;
  };
  payment: {
    amount?: string;
    method?: string;
    status?: string;
  };
}

export default function BookingHistoryTable() {
  const axiosSecured = useApiSecured();
  const path = usePathname();
  const [isFetched, setIsFetched] = useState(false);
  const [bookings, setBookings] = useState<BookingHistory[] | null>(null);

  useEffect(() => {
    async function getBookings() {
      try {
        const response = await axiosSecured("/lib/apiCalls/booking");

        if (response.status === 200) setBookings(response.data.bookings);
        setIsFetched(true);
      } catch (error) {
        toast.error("Gagal mengambil data riwayat booking");
      }
    }
    getBookings();
  }, []);

  return (
    // <div className="overflow-x-scroll px-8">
    <table
      className={
        "table-container" +
        (path.startsWith("/riwayat") ? " h-[60vh]" : " h-[70vh]")
      }
    >
      <thead className="table-head">
        <tr className="flex w-full items-center rounded-tl-xl rounded-tr-xl bg-darkgray text-center">
          <th className="w-52 p-2 font-medium text-white">Nomor Booking</th>
          <th className="w-44 p-2 font-medium text-white">Tanggal Booking</th>
          <th className="w-52 p-2 font-medium text-white">
            Nama Coworking Space
          </th>
          <th className="w-32 p-2 font-medium text-white">Jumlah Pembayaran</th>
          <th className="w-40 p-2 font-medium text-white">Status</th>
        </tr>
      </thead>

      <tbody className="table-body">
        {isFetched &&
          bookings &&
          (bookings.length !== 0 ? (
            bookings.map((b) => {
              return (
                <tr
                  className="flex w-full items-center text-center"
                  key={b.booking_id}
                >
                  <td className="w-52 break-words p-2">{b.booking_id}</td>

                  <td className="w-44 break-words p-2">
                    {b.date.replace(b.date, (match) => {
                      const date = new Date(match);
                      return date.toDateString();
                    })}
                  </td>

                  <td className="w-52 break-words p-2">
                    {b.coworking_space.name}
                  </td>

                  <td className="w-32 break-words p-2">
                    Rp.{" "}
                    {b.payment?.amount ? moneySplitter(b.payment.amount) : "-"}
                  </td>

                  <td className="w-40 break-words p-2">
                    {b.payment?.status
                      ? StatusBlockColor(
                          b.payment.status,
                          "rounded-full px-6 py-3 text-center",
                        )
                      : "Belum bayar!"}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="flex w-full">
              <td className="grid w-full justify-center p-4">Data Kosong</td>
            </tr>
          ))}
      </tbody>
    </table>
    // </div>
  );
}
