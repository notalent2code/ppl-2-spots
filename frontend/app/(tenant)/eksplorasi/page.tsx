import getAllSpace from "@/app/lib/apiCalls/getAllSpace";
import SpaceCard from "@/app/components/SpaceCard";
import ExplorePageNav from "@/app/components/ExplorePageNav";
import * as NProgress from "nprogress";

export default async function Explore({
  searchParams,
}: {
  searchParams: { search: string | undefined; page: string | undefined };
}) {
  const keyWord = searchParams ?? null;
  const [spaceResult, pagination] = await getAllSpace(keyWord);
  NProgress.done();

  return (
    <>
      <ExplorePageNav
        prevIndex={pagination.previousPage}
        currentIndex={pagination.currentPage}
        nextIndex={pagination.nextPage}
      />

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
