import React from "react";

export const UserContext = React.createContext();

export function UserContextProvider({ children, value }) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
