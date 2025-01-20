import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { axiosInstance } from '../lib/axiosInsatnce';
import toast from 'react-hot-toast';
import Loading from '../lib/Loading';

// Define the shape of the user object
interface User {
  id: string;
  name: string;
  email: string;
  // Add more fields as per your API response
}

// Define the context value type
interface AuthContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

// Create a context with an initial null value
export const AuthContext = createContext<AuthContextValue | null>(null);

// Define the props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // User state initialized to null
  const [loading, setLoading] = useState<boolean>(true); // Loading state to indicate fetching status

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get<User>('/auth/profile'); // Await the API response
        setUser(res.data); // Set the user data from response
      } catch (err: any) {
        toast.error(err?.response?.data?.data || 'Failed to fetch profile'); // Error handling
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchProfile(); // Call the fetchProfile function
  }, []); // Run once on mount

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {loading ? <Loading /> : children} {/* Show loading state */}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
