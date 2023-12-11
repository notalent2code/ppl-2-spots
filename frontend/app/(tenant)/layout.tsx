"use client";

import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import TopLoadingBar from "../components/TopLoadingBar";
import { usePathname } from "next/navigation";
import useApiSecured from "../lib/hooks/useApiSecured";
import MainLoading from "../components/MainLoading";
import SpaceIdInfoProvider from "../lib/hooks/useSpaceIdInfo";
import { useUserInfoContext } from "../lib/hooks/useUserInfoContext";

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const axiosSecured = useApiSecured();

  const [checkLogin, setCheckLogin] = useState(false);
  const { profile, setProfile } = useUserInfoContext();

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await axiosSecured("/lib/apiCalls/tenant");

        if (response.status === 200) {
          setProfile(response.data.tenant);
        }
      } catch (error) {
        console.error("unsigned user");
      }
      setCheckLogin(true);
    }

    getProfile();
  }, [profile?.avatar_url]);

  if (!checkLogin) return <MainLoading />;

  return (
    <main>
      {/* <TopLoadingBar /> */}

      <section className="h-[73px] min-w-min bg-darkblue">
        <Navbar />
      </section>

      <SpaceIdInfoProvider>{children}</SpaceIdInfoProvider>
    </main>
  );
}
