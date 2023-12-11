"use client";

import { useState, useEffect, useCallback } from "react";

export default function TopLoadingBar() {
  const [show, setShow] = useState(true);

  const toggleLoading = useCallback(() => {
    setShow((value) => !value);
  }, []);
  console.log(`luar ${show}`);

  useEffect(() => {
    setShow(false);
    console.log("tes" + show);
  }, []);

  return (
    <>
      {show && (
        <div className="fixed left-0 top-0 z-30 h-1 w-full bg-yellow-300" />
      )}
    </>
  );
}
