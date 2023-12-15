"use client";

import BookingHistoryTable from "@/app/components/Table/BookingHistoryTable";

export default function TenantBookingHistory() {
  return (
    <div className="fixed top-0 col-span-8 h-screen w-full overflow-x-auto overflow-y-clip px-4 pb-8 pt-[73px] md:col-span-6">
      <title>Riwayat Booking</title>

      <h1 className="sticky left-0">Daftar Booking Anda</h1>

      <BookingHistoryTable />
    </div>
  );
}
