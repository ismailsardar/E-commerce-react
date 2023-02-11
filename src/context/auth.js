import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    // const name = 'ismile';
    const [auth, setAuth] = useState({
        user: null,
        token:''
    });

    useEffect(()=>{
        const data = localStorage.getItem("auth");
        if (data) {
            const parsed = JSON.parse(data);
            setAuth({...auth,user:parsed.Customer,token:parsed.Token});
        }
    },[]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
        {children}
    </AuthContext.Provider>
  )
}

const useAuth = ()=> useContext(AuthContext);

export {useAuth, AuthProvider}