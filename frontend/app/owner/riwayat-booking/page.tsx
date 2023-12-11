"use client";

import BookingHistoryTable from "@/app/components/Table/BookingHistoryTable";

export default function OwnedSpaceBookingHistory() {
  return (
    <section className="table-section">
      <title>Riwayat Booking</title>

      <h1 className="table-h1">Riwayat Booking Space Anda</h1>

      <BookingHistoryTable />
    </section>
  );
}
