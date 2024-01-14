import React, { createContext, useEffect, useState } from "react";
import axios from "../api/axios";

const userAuth = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <userAuth.Provider value={{ user, setUser }}>{children}</userAuth.Provider>
  );
};

export default userAuth;
