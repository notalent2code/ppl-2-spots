"use client";

export default function ExploreLoadingCard() {
  return (
    <>
      {[...Array(10).keys()].map((i) => (
        <div className="w-full px-12 py-5 md:w-1/2" key={i}>
          <div className="rounded-xl bg-white drop-shadow-md">
            <div className="aspect-video w-full animate-pulse rounded-tl-xl rounded-tr-xl bg-slate-200" />

            <div className="mx-5 gap-6 py-2">
              <p className="my-2 h-4 animate-pulse rounded-md bg-slate-200 px-2 py-3"></p>
              <p className="my-2 h-4 w-1/2 animate-pulse rounded-md bg-slate-200 px-2 py-3"></p>
              <p className="my-2 h-4 w-2/3 animate-pulse rounded-md bg-slate-200 px-2 py-3"></p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
