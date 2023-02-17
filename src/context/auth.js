import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // const name = 'ismile';
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // axios config
  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  axios.defaults.headers.common["Authorization"] = auth?.token;
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsed = JSON.parse(data);
      setAuth({ ...auth, user: parsed.Customer, token: parsed.Token });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
