import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: Partial<User>, password: string) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for prototype
const mockUsers: User[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    role: 'host',
    verified: true,
    nafathVerified: true
  },
  {
    id: '2',
    name: 'سارة أحمد',
    email: 'sara@example.com',
    phone: '+966501234568',
    role: 'guest',
    verified: true
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@khadom.com',
    phone: '+966501234569',
    role: 'admin',
    verified: true
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role?: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let foundUser = mockUsers.find(u => u.email === email);
    
    // If role is specified, filter by role too
    if (role && foundUser) {
      foundUser = foundUser.role === role ? foundUser : undefined;
    }
    
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const signup = async (userData: Partial<User>, password: string): Promise<boolean> => {
    // Mock signup - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      role: userData.role || 'host',
      verified: false,
      nafathVerified: false
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      signup,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};