"use client";

import { useRouter } from "next/navigation";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import * as NProgress from "nprogress";

export default function ExplorePageNav({
  prevIndex,
  currentIndex,
  nextIndex,
}: {
  prevIndex: number | null;
  currentIndex: number;
  nextIndex: number | null;
}) {
  const { push } = useRouter();

  function pageNav(pageIndex: number | null, direction: "PREV" | "NEXT") {
    const navArrow =
      direction === "PREV" ? (
        <GoChevronLeft size="1.5em" color="white" />
      ) : (
        <GoChevronRight size="1.5em" color="white" />
      );
    return (
      <>
        {pageIndex ? (
          <button
            className="flex items-center rounded-md bg-darkblue p-2"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              NProgress.start();
              push(`/eksplorasi?page=${pageIndex}`);
            }}
          >
            {navArrow}
          </button>
        ) : (
          <div className="flex items-center rounded-md bg-darkblue bg-opacity-50 p-2">
            {navArrow}
          </div>
        )}
      </>
    );
  }
  return (
    <>
      <div className="sticky top-52 z-10 flex h-12 w-full justify-center gap-x-12 bg-white/95 pb-2 stm:top-36 stm:gap-x-24">
        {pageNav(prevIndex, "PREV")}

        <div className="flex flex-col justify-center text-center">
          <p>Halaman</p>
          <div className="grid w-max cursor-default grid-flow-col gap-x-2">
            <p
              className={
                (!prevIndex ? "opacity-0 " : "bg-slate-100 ") + "w-6 rounded-md"
              }
            >
              {prevIndex}
            </p>

            <p className={"w-6 rounded-md bg-blue-300"}>{currentIndex}</p>

            <p
              className={
                (!nextIndex ? "opacity-0 " : "bg-slate-100 ") + "w-6 rounded-md"
              }
            >
              {nextIndex}
            </p>
          </div>
        </div>

        {pageNav(nextIndex, "NEXT")}
      </div>
    </>
  );
}
