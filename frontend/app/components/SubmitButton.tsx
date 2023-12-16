"use client";

import { useEffect, useState } from "react";

export default function SubmitButton({
  state,
  style,
  label,
}: {
  state: boolean;
  style: string;
  label: string;
}) {
  const [isClicked, setIsClicked] = useState(state);

  useEffect(() => {
    setIsClicked(state);
  }, [state]);

  return (
    <button
      type="submit"
      className={
        (isClicked ? "relative cursor-not-allowed " : "cursor-pointer ") + style
      }
      disabled={isClicked}
    >
      {isClicked && (
        <div className="absolute left-1/2 -translate-x-1/2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin"
          >
            <circle cx="26" cy="26" r="23.5" stroke="#5A5A5A" strokeWidth="5" />
            <path
              d="M5 26H0C0 11.6406 11.6406 0 26 0V5C14.402 5 5 14.402 5 26Z"
              fill="#E6E6E6"
            />
          </svg>
        </div>
      )}
      <p className={isClicked ? "invisible" : ""}>{label}</p>
    </button>
  );
}
