"use client";

import useApiSecured from "@/app/lib/hooks/useApiSecured";
import { useUserInfoContext } from "@/app/lib/hooks/useUserInfoContext";
import { useEffect, useState } from "react";
import TenantProfileLoadingCard from "./loading";

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const axiosSecured = useApiSecured();

  const [isProfileFetched, setIsProfileFetched] = useState(false);
  const { userType, setProfile } = useUserInfoContext();

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
      setIsProfileFetched(true);
    }

    getProfile();
  }, [userType]);

  return (
    <>
      <title>User Profile</title>

      <h1>User Profile</h1>

      {isProfileFetched ? children : <TenantProfileLoadingCard />}
    </>
  );
}
