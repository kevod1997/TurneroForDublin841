import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";
// import io from 'socket.io-client';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState([]);
  const [loading , setLoading] = useState(true)


  const signIn = async (admin) => {
    try {
      const res = await loginRequest(admin);
      console.log(res);
      setIsAuthenticated(true);
      setAdmin(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setAuthError(error.response.data);
      }
      setAuthError([error.response.data.message]);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setAdmin(null);
    };

    useEffect(()=> {
        if(authError.length > 0) {
            const timer = setTimeout(()=> {
                setAuthError([])
            }, 4000)
            return () => clearTimeout(timer)
        }
    }, [authError])

    useEffect(() => {
      async function checkLogin() {
        const cookies = Cookies.get();
        console.log(cookies);
        if (!cookies.token){
          setIsAuthenticated(false);
          setLoading(false);
          return setAdmin(null);
        } 
  
          try {
            const res = await verifyTokenRequest(cookies.token);
            console.log(res);
            if (!res.data) {
            setIsAuthenticated(false);
            setLoading(false);
            return
            } 
  
            setIsAuthenticated(true);
            setAdmin(res.data);
            setLoading(false);
          } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
            setAdmin(null);
            setLoading(false);
        }
      }
      checkLogin();
    }, []);

  return (
    <AuthContext.Provider value={{ signIn, logout, admin, isAuthenticated, authError, loading }}>{children}</AuthContext.Provider>
  );
};
