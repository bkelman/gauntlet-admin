// AuthProvider.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";  // Adjusted import to match Firebase SDK v9 and above
import { app } from "./firebase";  // Import the Firebase app instance

// Initialize Firebase Auth
const auth = getAuth(app);

export const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);  // Returns the context value
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};