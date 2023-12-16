"use client";

import { createContext, useState, useContext } from "react";

export type Availabilities = {
  start: string;
  end: string;
}[];

type ISpaceIdInfoContext = {
  image: string | null;
  schedule: Availabilities | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  setSchedule: React.Dispatch<React.SetStateAction<Availabilities | null>>;
};

export const SpaceIdInfoContext = createContext<ISpaceIdInfoContext | null>(
  null,
);

export default function SpaceIdInfoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [image, setImage] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<Availabilities | null>(null);

  return (
    <SpaceIdInfoContext.Provider
      value={{
        image,
        schedule,
        setImage,
        setSchedule,
      }}
    >
      {children}
    </SpaceIdInfoContext.Provider>
  );
}

export function useSpaceIdInfoContext() {
  const context = useContext(SpaceIdInfoContext);
  if (!context) {
    throw new Error("Failed to fetch SpaceId info");
  }

  return context;
}
