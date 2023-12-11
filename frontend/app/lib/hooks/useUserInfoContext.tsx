"use client";

import { createContext, useState, useContext } from "react";

type UserType = "TENANT" | "OWNER" | "ADMIN" | "UNASSIGNED";

type IUserInfoContext = {
  userType: UserType;
  profile: ProfileType | null;
  setUserType: React.Dispatch<React.SetStateAction<UserType>>;
  setProfile: React.Dispatch<React.SetStateAction<ProfileType | null>>;
};

export type ProfileType = {
  user_id: number;
  avatar_url: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
  };
};

export const UserInfoContext = createContext<IUserInfoContext | null>(null);

export default function UserInfoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userType, setUserType] = useState<UserType>("UNASSIGNED");
  const [profile, setProfile] = useState<ProfileType | null>(null);

  return (
    <UserInfoContext.Provider
      value={{
        userType,
        profile,
        setUserType,
        setProfile,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}

export function useUserInfoContext() {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error("Failed to fetch user info");
  }

  return context;
}
