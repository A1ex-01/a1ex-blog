"use client";

import { IUser } from "@/types/user";
import { createContext, ReactNode, useContext, useState } from "react";

interface UserContextType {
  userInfo: IUser | null;
  setUserInfo: (userInfo: IUser | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
  user,
}: {
  children: ReactNode;
  user?: IUser;
}) {
  const [userInfo, setUserInfo] = useState<IUser | null>(user || null);
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
