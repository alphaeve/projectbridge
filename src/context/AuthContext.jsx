import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Login: store in state + localStorage
  const login = ({ email, username, role }) => {
    const userData = { email, username, role };
    setUser(userData);
    localStorage.setItem("projectBridgeUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("projectBridgeUser");
  };

  // 🚀 Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("projectBridgeUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
