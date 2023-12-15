"use client";

export default function TenantProfileLoadingCard() {
  return (
    <div className="justtify-center my-10 block items-center bg-slate-300 py-20">
      <div className="flex items-center justify-center">
        <div className="m-6 rounded-2xl bg-slate-100">
          <div className="m-8 animate-pulse rounded-2xl bg-slate-200 p-12" />
        </div>
      </div>

      <div className="mx-8 rounded-xl bg-slate-100 p-6 md:col-span-2">
        <div className="my-3 grid h-8 animate-pulse rounded-md bg-slate-200" />

        <div className="my-3 grid h-8 animate-pulse rounded-md bg-slate-200" />

        <div className="my-3 grid h-8 animate-pulse rounded-md bg-slate-200" />
      </div>
    </div>
  );
}
