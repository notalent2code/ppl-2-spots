"use client";

import BookingHistoryTable from "@/app/components/Table/BookingHistoryTable";

export default function TenantBookingHistory() {
  return (
    <div className="col-span-8 h-[80vh] overflow-x-auto overflow-y-clip px-4 pb-8 md:col-span-6">
      <title>Riwayat Booking</title>

      <h1>Daftar Booking Anda</h1>

      <BookingHistoryTable />
    </div>
  );
}
