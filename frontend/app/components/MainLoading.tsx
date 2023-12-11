"use client";

export default function MainLoading() {
  return (
    <div className="h-screen bg-darkblue">
      <div className="grid h-screen items-center justify-center bg-black opacity-50">
        <svg
          width="52"
          height="52"
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
    </div>
  );
}
