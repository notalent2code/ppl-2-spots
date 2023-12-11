"use client";

import { useCallback, useState } from "react";

interface CheckboxProps {
  value: number;
  label: string;
  checkboxHandler: (e: any) => void;
}

export default function Checkbox({
  value,
  label,
  checkboxHandler,
}: CheckboxProps) {
  const [check, setCheck] = useState(false);

  const checked = useCallback(() => {
    setCheck((check) => !check);
  }, []);

  return (
    <div
      className={
        (check ? "bg-green-400 " : "bg-purple-300 ") +
        "relative h-12 rounded-xl border-2 border-purple-600"
      }
    >
      <input
        className="absolute z-10 h-full w-full opacity-0"
        type="checkbox"
        placeholder="tes"
        value={value}
        onClick={checked}
        onChange={checkboxHandler}
      />
      <label className="z-0 grid h-full w-full items-center text-center">
        {label}
      </label>
    </div>
  );
}

export function CheckboxesLoad() {
  return (
    <>
      {[...Array(12).keys()].map((i) => (
        <div
          className="relative h-12 animate-pulse rounded-xl border-2 border-slate-300 bg-slate-200"
          key={i}
        >
          <input
            className="absolute z-10 h-full w-full opacity-0"
            type="checkbox"
            placeholder="tes"
          />
          <label className="z-0 grid h-full w-full items-center text-center"></label>
        </div>
      ))}
    </>
  );
}
