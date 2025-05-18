
import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo purposes
const mockUser: User = {
  id: "1",
  name: "Demo User",
  email: "demo@carteasy.com",
  isAdmin: false,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        // For demo purposes, any email/password combination works
        // In a real app, this would validate against a backend
        if (email && password) {
          setUser(mockUser);
          toast({
            title: "Logged in successfully",
            description: `Welcome back, ${mockUser.name}!`,
          });
          setIsLoading(false);
          resolve(true);
        } else {
          toast({
            title: "Login failed",
            description: "Invalid email or password",
            variant: "destructive",
          });
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        if (name && email && password) {
          // Create a new user based on the mock
          const newUser = { ...mockUser, name, email };
          setUser(newUser);
          toast({
            title: "Account created",
            description: `Welcome to CartEasy, ${name}!`,
          });
          setIsLoading(false);
          resolve(true);
        } else {
          toast({
            title: "Signup failed",
            description: "Please fill in all required fields",
            variant: "destructive",
          });
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        signup,
      }}
    >
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
