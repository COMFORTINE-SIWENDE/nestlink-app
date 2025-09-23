// contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../types";

// Extend User interface for property owners
interface PropertyOwner extends User {
  isPropertyOwner: boolean;
  idNumber?: string;
  phone?: string;
  company?: string;
  profileCompleted?: boolean;
}

interface AuthContextType {
  user: PropertyOwner | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    userData: Partial<PropertyOwner> & {
      password: string;
      userType: "regular" | "propertyOwner";
    }
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<PropertyOwner | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Simulate checking token/session
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Auth check error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockUser: PropertyOwner = {
        id: "1",
        name: "John Doe",
        email,
        isHost: false,
        isPropertyOwner: false,
        profileCompleted: true,
      };

      setUser(mockUser);
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    userData: Partial<PropertyOwner> & {
      password: string;
      userType: "regular" | "propertyOwner";
    }
  ) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockUser: PropertyOwner = {
        id: "1",
        name: userData.name || "New User",
        email: userData.email || "",
        isHost: userData.userType === "propertyOwner",
        isPropertyOwner: userData.userType === "propertyOwner",
        idNumber: userData.idNumber,
        phone: userData.phone,
        company: userData.company,
        profileCompleted: userData.userType === "regular" ? true : false, // property owners need to complete profile
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
    // Clear tokens / secure storage here
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
