import Link from "next/link";
import getAllSpace from "@/app/lib/apiCalls/getAllSpace";
import SpaceCard from "@/app/components/SpaceCard";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

export default async function Explore({
  searchParams,
}: {
  searchParams: { search: string | undefined; page: string | undefined };
}) {
  const keyWord = searchParams ?? null;
  const [spaceResult, pagination] = await getAllSpace(keyWord);

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
          <Link
            href={`/eksplorasi?page=${pageIndex}`}
            className="flex items-center rounded-md bg-darkblue p-2"
          >
            {navArrow}
          </Link>
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
        {pageNav(pagination.previousPage, "PREV")}

        <div className="flex flex-col justify-center text-center">
          <p>Halaman</p>
          <div className="grid w-max cursor-default grid-flow-col gap-x-2">
            <p
              className={
                (!pagination.previousPage ? "opacity-0 " : "bg-slate-100 ") +
                "w-6 rounded-md"
              }
            >
              {pagination.previousPage}
            </p>

            <p className={"w-6 rounded-md bg-blue-300"}>
              {pagination.currentPage}
            </p>

            <p
              className={
                (!pagination.nextPage ? "opacity-0 " : "bg-slate-100 ") +
                "w-6 rounded-md"
              }
            >
              {pagination.nextPage}
            </p>
          </div>
        </div>

        {pageNav(pagination.nextPage, "NEXT")}
      </div>

      {spaceResult ? (
        spaceResult.length !== 0 ? (
          spaceResult.map((space: any) => {
            return (
              <SpaceCard
                key={space.location.space_id}
                id={space.location.space_id}
                name={space.name}
                price={space.price}
                place={space.location.address}
                image={space.coworking_space_images[0].image_url}
              />
            );
          })
        ) : (
          <p className="m-8 w-full text-center text-lg text-black">
            Tidak ada Coworking Space
          </p>
        )
      ) : (
        <div className="m-8 w-full text-center text-lg text-black">
          Server Unreachable!
        </div>
      )}
    </>
  );
}
