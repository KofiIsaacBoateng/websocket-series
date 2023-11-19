import React, { createContext, useContext, useState } from "react";

const User = createContext();

function UserContext({ children }) {
  const [user, setUser] = useState(undefined);
  const updateUser = (user) => {
    setUser((prev) => user);
  };
  return (
    <User.Provider
      value={{
        user,
        updateUser,
      }}
    >
      {children}
    </User.Provider>
  );
}

export const useUserContext = () => useContext(User);
export default UserContext;
