"use client";

import BookingHistoryTable from "@/app/components/Table/BookingHistoryTable";

export default function BookingHistoryList() {
  return (
    <section className="table-section">
      <title>Riwayat Booking</title>

      <h1 className="table-h1">Data Riwayat Booking</h1>

      <BookingHistoryTable />
    </section>
  );
}
