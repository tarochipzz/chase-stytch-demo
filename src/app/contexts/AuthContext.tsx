"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AuthState {
  user: { name: string; email: string; phoneNumber: string };
  isAuthenticated: boolean;
}

interface AuthContextType {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

const defaultAuthState: AuthState = {
  user: { name: "", email: "", phoneNumber: "" },
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
