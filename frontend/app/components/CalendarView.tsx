"use client";

import Calendar from "color-calendar";
import "color-calendar/dist/css/theme-glass.css";
import { MouseEventHandler, useEffect, useState } from "react";
import { GoChevronRight } from "react-icons/go";

export type BookedData = {
  start: string;
  end: string;
};

export default function CalendarView({
  bookedScheduleProps,
}: {
  bookedScheduleProps: BookedData[] | null | undefined;
}) {
  const [seeAvailabilities, setSeeAvailabilities] = useState(false);
  const [bookedPeriod, setBookedPeriod] = useState<number[]>([]);

  useEffect(() => {
    new Calendar({
      id: "#calendar",
      theme: "glass",
      primaryColor: "#1a237e",
      headerBackgroundColor: "#0f172a",
      weekdayType: "long-upper",
      monthDisplayType: "long",
      calendarSize: "small",
      layoutModifiers: ["month-left-align"],
      eventsData: bookedScheduleProps ?? [],
      selectedDateClicked: (currentDate: any, filteredMonthEvents: any) => {
        let bookedHour: number[] = [];

        filteredMonthEvents.forEach((value: BookedData) => {
          const startHour = parseInt(value.start.slice(11, 13));
          const endHour = parseInt(value.end.slice(11, 13));

          for (let i = startHour; i < endHour; i++) {
            bookedHour.push(i - 8);
          }
        });

        setBookedPeriod(bookedHour);
        setSeeAvailabilities((value) => !value);
      },

      dateChanged: () => {
        setSeeAvailabilities(false);
      },
      monthChanged: () => {
        setSeeAvailabilities(false);
      },
    });
  }, []);

  return (
    <div id="calendar" className="relative">
      {seeAvailabilities && (
        <div className="absolute -right-1 top-0 w-72 rounded-md border-2 border-green-800 bg-white px-2 py-2 text-center text-black sm:right-2 lg:-right-4">
          <button
            className="absolute right-2 bg-slate-200"
            onClick={() => setSeeAvailabilities(false)}
          >
            <GoChevronRight />
          </button>
          <p className="my-1 w-full font-semibold">Waktu Ketersediaan</p>
          <div className="grid grid-cols-10">
            {[...Array(10).keys()].map((i) => (
              <p className="px-[2px]" key={i}>
                {i + 8}
              </p>
            ))}
          </div>

          <div className="flex justify-center px-3">
            {[...Array(9).keys()].map((i) => (
              <span
                className={
                  (bookedPeriod.includes(i) ? "bg-red-600 " : "bg-green-100 ") +
                  "h-5 w-8 border-l-2 border-l-darkblue px-[2px] font-semibold text-white" +
                  (i === 8 ? " border-r-2 border-r-darkblue" : "")
                }
                key={i}
              ></span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
