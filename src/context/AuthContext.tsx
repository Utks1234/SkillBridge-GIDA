import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'student' | 'employer' | 'nodal_officer';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  token?: string;
  metadata?: {
    institute?: string;
    trade?: string;
    companyName?: string;
    sector?: string;
    gidaPlotNo?: string;
    officerDesignation?: string;
    clearanceLevel?: string;
  };
}

interface AuthContextType {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  loginAs: (role: UserRole, customDetails?: Partial<AuthUser>) => void;
  signup: (role: UserRole, details: { name: string; email: string; metadata?: any }) => void;
  logout: () => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  activeAuthRole: UserRole;
  setActiveAuthRole: (role: UserRole) => void;
  isDemoSwitching: boolean;
}

const defaultStudentUser: AuthUser = {
  id: 'usr_utkarsh_01',
  name: 'Utkarsh Vishwakarma',
  email: 'utkarsh.vishwakarma@bit.edu',
  role: 'student',
  metadata: {
    institute: 'Buddha Institute of Technology, Gorakhpur',
    trade: 'Mechanical & Automation Eng.'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to student user for immediate smooth experience, stored in localStorage
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('skillbridge_auth_user');
      return saved ? JSON.parse(saved) : defaultStudentUser;
    } catch {
      return defaultStudentUser;
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [activeAuthRole, setActiveAuthRole] = useState<UserRole>('student');
  const [isDemoSwitching, setIsDemoSwitching] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('skillbridge_auth_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('skillbridge_auth_user');
      }
    } catch {
      // storage error
    }
  }, [currentUser]);

  const loginAs = (role: UserRole, customDetails?: Partial<AuthUser>) => {
    setIsDemoSwitching(true);

    let newUser: AuthUser;
    if (role === 'student') {
      newUser = {
        id: 'usr_utkarsh_01',
        name: customDetails?.name || 'Utkarsh Vishwakarma',
        email: customDetails?.email || 'utkarsh.vishwakarma@bit.edu',
        role: 'student',
        metadata: {
          institute: customDetails?.metadata?.institute || 'Buddha Institute of Technology, Gorakhpur',
          trade: customDetails?.metadata?.trade || 'Mechanical & Automation Eng.'
        }
      };
    } else if (role === 'employer') {
      newUser = {
        id: 'usr_emp_02',
        name: customDetails?.name || 'Gallantt Ispat HR Desk',
        email: customDetails?.email || 'hr@gallantt.com',
        role: 'employer',
        metadata: {
          companyName: customDetails?.metadata?.companyName || 'Gallantt Ispat Limited',
          sector: customDetails?.metadata?.sector || 'Sector 13 Heavy Engineering',
          gidaPlotNo: 'Plot 1-4, Sector 13'
        }
      };
    } else {
      newUser = {
        id: 'usr_nodal_03',
        name: customDetails?.name || 'Dr. Rajesh Saxena (IAS)',
        email: customDetails?.email || 'nodal.officer@gida.up.gov.in',
        role: 'nodal_officer',
        metadata: {
          officerDesignation: 'Executive Nodal Officer & CEO Desk, GIDA',
          clearanceLevel: 'District Executive Clearance (Gorakhpur DM)'
        }
      };
    }

    setCurrentUser(newUser);
    setAuthModalOpen(false);

    setTimeout(() => {
      setIsDemoSwitching(false);
    }, 400);
  };

  const signup = (role: UserRole, details: { name: string; email: string; metadata?: any }) => {
    const newUser: AuthUser = {
      id: `usr_${Date.now()}`,
      name: details.name,
      email: details.email,
      role,
      metadata: details.metadata
    };
    setCurrentUser(newUser);
    setAuthModalOpen(false);
  };

  const logout = () => {
    setCurrentUser(null);
    setAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        loginAs,
        signup,
        logout,
        authModalOpen,
        setAuthModalOpen,
        activeAuthRole,
        setActiveAuthRole,
        isDemoSwitching
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
