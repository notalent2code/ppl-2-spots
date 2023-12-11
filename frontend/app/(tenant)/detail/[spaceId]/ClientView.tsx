"use client";

import { useState, useCallback } from "react";
import { SpaceResultDetail } from "@/app/lib/apiCalls/getSpaceByID";
import Image from "next/image";
import Link from "next/link";
import moneySplitter from "@/app/lib/moneySplitter";
import CalendarView from "@/app/components/CalendarView";
import MapVisualization from "@/app/components/MapVisualization";
import { HiMiniMapPin } from "react-icons/hi2";
import { GoX } from "react-icons/go";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSpaceIdInfoContext } from "@/app/lib/hooks/useSpaceIdInfo";
import { useUserInfoContext } from "@/app/lib/hooks/useUserInfoContext";

export function remapAvailabilities(value: {
  availability_id: number;
  space_id: number;
  date: string;
  start_hour: number;
  end_hour: number;
  is_booked: boolean;
}) {
  return {
    start: `${value.date}T${
      value.start_hour.toString().length === 1
        ? "0" + value.start_hour
        : value.start_hour
    }:00:00`,
    end: `${value.date}T${
      value.end_hour.toString().length === 1
        ? "0" + value.end_hour
        : value.end_hour
    }:00:00`,
  };
}

export default function ClientDetailView(space: SpaceResultDetail) {
  const isDataFetched = true;
  const { push } = useRouter();
  const { profile } = useUserInfoContext();
  const { setImage, setSchedule } = useSpaceIdInfoContext();
  const availabilityArray = space.availabilities?.map((value) => {
    return remapAvailabilities(value);
  });

  const [hideScroll, sethideScroll] = useState(false);
  const [showPictureContainer, setShowPictureContainer] = useState(false);

  const togglePictureContainer = useCallback(() => {
    sethideScroll((value) => !value);
    setShowPictureContainer((value) => !value);
  }, []);

  async function booking() {
    if (!profile) {
      toast.error("Login dahulu");
    } else {
      setSchedule(availabilityArray ?? []);
      setImage(space.coworking_space_images[0].image_url);
      push(
        `/booking/${space.location.location_id}?name=${space.name}&price=${space.price}`,
      );
    }
  }

  return (
    <div
      className={
        hideScroll
          ? "h-detailview absolute w-full overflow-hidden"
          : "h-detailview absolute w-full "
      }
    >
      <title>Detail</title>

      {isDataFetched && (
        <>
          <h1>{space && space.name}</h1>

          {showPictureContainer && (
            <div
              className={
                "fixed top-0 z-30 flex h-screen w-screen animate-slideupfast justify-center bg-white bg-opacity-50"
              }
            >
              <div
                className={
                  "relative flex w-full animate-slideupfast flex-wrap place-content-start overflow-x-hidden overflow-y-scroll bg-white p-4 md:w-3/4"
                }
              >
                <span
                  className="sticky top-0 h-min cursor-pointer rounded-sm bg-red-500 text-white"
                  onClick={togglePictureContainer}
                >
                  <GoX size="1em" />
                </span>

                {space.coworking_space_images.map((picture: any) => {
                  return (
                    <Image
                      key={picture.image_url}
                      alt="room"
                      src={picture.image_url}
                      className="aspect-video w-full object-cover p-6"
                      width={1280}
                      height={720}
                    />
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid py-2 lg:grid-cols-3">
            <div className="grid gap-y-4 lg:col-span-2">
              <div className="relative mt-5 flex md:mx-10 md:rounded-xl lg:ml-10 lg:mr-2 ">
                <Image
                  alt="room"
                  src={space.coworking_space_images[0].image_url}
                  className="aspect-video w-full bg-left object-cover md:rounded-xl"
                  width={1280}
                  height={720}
                />
                {space.coworking_space_images.length > 1 && (
                  <span
                    className="absolute bottom-4 right-4 cursor-pointer rounded-full bg-white px-2 font-medium"
                    onClick={togglePictureContainer}
                  >
                    Lihat Selengkapnya
                  </span>
                )}
              </div>

              <div className="border-1 bg-gray-100 p-5 md:mx-10 md:rounded-xl lg:ml-10 lg:mr-2">
                <div className="flex">
                  <p className="text-xl font-semibold">Tentang</p>
                  <p className="mx-2 text-xl font-semibold text-gray-600">
                    Coworking Space
                  </p>
                </div>
                <p className="mt-2 font-medium text-gray-600">
                  {space.description}
                </p>
              </div>

              <div className="border-1 bg-gray-100 p-5 md:mx-10 md:rounded-xl lg:ml-10 lg:mr-2">
                <p className="mb-2 text-xl font-semibold">Fasilitas</p>
                <ul className="ml-10 list-disc font-medium text-gray-600">
                  <li>{space.capacity} Kursi</li>
                  {space &&
                    space.coworking_space_facilities.map((fac) => {
                      return (
                        <li key={fac.facility.facility_id}>
                          {fac.facility.name}
                        </li>
                      );
                    })}
                </ul>
                <p className="mt-2 text-xl font-semibold">Lokasi</p>
                <div className="mt-2 flex items-center">
                  <HiMiniMapPin size="2em" />
                  <p className="mt-2 font-medium text-gray-600">
                    {space && space.location.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative grid content-start lg:col-span-1">
              <div className="sticky top-20 grid gap-y-4">
                <div className="border-1 right mt-5 h-fit bg-gray-100 p-5 md:mx-10 md:rounded-xl lg:ml-2 lg:mr-10">
                  <p className="text-xl font-bold">Harga</p>
                  <p className="mt text-2xl font-bold text-cyan-500">
                    Rp {moneySplitter(space.price)}/Jam
                  </p>
                </div>

                <div className="border-1 right bg-gray-100 p-5 md:mx-10 md:rounded-xl lg:ml-2 lg:mr-10">
                  <p className="mb-4 text-xl font-semibold">
                    Cek Waktu Kosong Tempat
                  </p>

                  <div className="grid justify-center">
                    <CalendarView bookedScheduleProps={availabilityArray} />
                  </div>

                  <p className="my-4 font-medium text-green-700">
                    *Klik 2 kali pada tanggal untuk cek ketersediaan
                  </p>

                  <hr className="mt-0" />

                  <button
                    className="m-auto mt-5 block rounded-full bg-darkblue px-20
                    py-3 text-center font-semibold text-white hover:bg-teal-700"
                    onClick={booking}
                  >
                    Booking
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid py-2 md:grid-cols-3"></div>

          <div className="grid py-2 md:grid-cols-3"></div>

          <div className="mb-4 flex justify-center md:mx-10">
            <MapVisualization
              lat={space.location.latitude}
              lng={space.location.longitude}
              draggable={false}
              label="Peta Lokasi"
              style="mb-5 h-full w-full md:rounded-xl bg-gray-100 p-4"
            />
          </div>
        </>
      )}
    </div>
  );
}
