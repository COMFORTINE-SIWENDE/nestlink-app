import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token/session
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Simulate checking for existing auth
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In a real app, you would check for a token in secure storage
      // and validate it with your backend
    } catch (error) {
      console.error("Auth check error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock user data - replace with actual API call
      const mockUser: User = {
        id: "1",
        name: "John Doe",
        email,
        isHost: false,
      };

      setUser(mockUser);
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock user data - replace with actual API call
      const mockUser: User = {
        id: "1",
        name: userData.name || "New User",
        email: userData.email || "",
        isHost: false,
      };

      setUser(mockUser);
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error("Failed to register");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // Clear any stored tokens here
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
