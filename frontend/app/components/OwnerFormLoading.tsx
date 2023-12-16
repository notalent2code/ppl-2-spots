"use client";

export default function OwnerFormLoading() {
  return (
    <div className="mb-8 grid gap-y-8 rounded-xl border border-gray-300 px-4 py-8 shadow-lg">
      <div className="h-8 w-full animate-pulse rounded-lg bg-slate-200" />
      <div className="h-8 w-1/3 animate-pulse rounded-lg bg-slate-200" />
      <div className="h-8 w-2/3 animate-pulse rounded-lg bg-slate-200" />
      <div className="h-8 w-full animate-pulse rounded-lg bg-slate-200" />
      <div className="h-8 w-1/3 animate-pulse rounded-lg bg-slate-200" />
    </div>
  );
}
