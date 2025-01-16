// UserContext.js
import React, { createContext, useState, useContext ,useEffect} from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

 
  const isLoggedIn = () => {
    const storedUser = localStorage.getItem("user");
    return !!user || !!storedUser;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // useEffect(() => {
  //   const handleStorageChange = (event) => {
  //     if (event.key === "user") {
  //       const newUser = event.newValue ? JSON.parse(event.newValue) : null;
  //       setUser(newUser);
  //     }
  //   };

  //   window.addEventListener("storage", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);



  

  return (
    <UserContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
