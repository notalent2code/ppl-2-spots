"use client";

import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import useApiSecured from "../lib/hooks/useApiSecured";
import MainLoading from "../components/MainLoading";
import SpaceIdInfoProvider from "../lib/hooks/useSpaceIdInfoContext";
import { useUserInfoContext } from "../lib/hooks/useUserInfoContext";

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const axiosSecured = useApiSecured();

  const [checkLogin, setCheckLogin] = useState(false);
  const { profile, userType, setProfile, setUserType } = useUserInfoContext();

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await axiosSecured("/lib/apiCalls/tenant");

        if (response.status === 200) {
          setProfile(response.data.tenant);
          setUserType("TENANT");
        }
      } catch (error) {
        console.error("Unsigned user");
      }
      setCheckLogin(true);
    }

    getProfile();
  }, [profile?.avatar_url, userType]);

  if (!checkLogin) return <MainLoading />;

  return (
    <main>
      <section className="h-[73px] min-w-min bg-darkblue">
        <Navbar />
      </section>

      <SpaceIdInfoProvider>{children}</SpaceIdInfoProvider>
    </main>
  );
}
