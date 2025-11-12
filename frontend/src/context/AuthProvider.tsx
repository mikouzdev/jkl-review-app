import axios from "axios";
import { googleLogout, type CredentialResponse } from "@react-oauth/google";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  userId: number;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  googleSignIn: (credential: CredentialResponse) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // set axios header when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // fetch current user if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await axios.get("/api/users/me");
        setUser(res.data.user);
      } catch {
        logout();
      }

      setIsLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post("/api/users/login", { email, password });
      const { token: jwt } = res.data;

      localStorage.setItem("token", jwt);
      setToken(jwt);

      return true;
    } catch {
      return false;
    }
  };

  const googleSignIn = async (credential: CredentialResponse) => {
    try {
      const response = await axios.post("/api/auth/google", credential);
      const { token: jwt } = response.data;

      localStorage.setItem("token", jwt);
      setToken(jwt);

      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    googleLogout();
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    isAdmin: user?.role === "admin",
    isLoading,
    login,
    logout,
    googleSignIn,
  };

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
