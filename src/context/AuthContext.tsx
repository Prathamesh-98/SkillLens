import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { User } from '../types';
import { toast } from 'react-toastify';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithPhone: (phone: string, otp: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Convert Firebase User to our User type
  const convertFirebaseUser = (firebaseUser: FirebaseUser): User => {
    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || 'Anonymous User',
      email: firebaseUser.email || '',
      photoURL: firebaseUser.photoURL || undefined,
      created_at: new Date().toISOString()
    };
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userObj = convertFirebaseUser(firebaseUser);
        setUser(userObj);
        localStorage.setItem('skilllens_user', JSON.stringify(userObj));
      } else {
        setUser(null);
        localStorage.removeItem('skilllens_user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result.user) {
        toast.success('Successfully signed in!');
        return true;
      }
      return false;
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        toast.success('Successfully signed in with Google!');
        return true;
      }
      return false;
    } catch (error: any) {
      if (error.code !== 'auth/popup-closed-by-user') {
        toast.error(error.message || 'Failed to sign in with Google');
      }
      return false;
    }
  };

  const loginWithPhone = async (phone: string, otp: string): Promise<boolean> => {
    // Keep the mock implementation for now
    if (otp === '123456') {
      const users = JSON.parse(localStorage.getItem('skilllens_users') || '[]');
      const foundUser = users.find((u: any) => u.phone === phone);

      if (foundUser) {
        const userObj: User = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          phone: foundUser.phone,
          created_at: foundUser.created_at
        };
        setUser(userObj);
        localStorage.setItem('skilllens_user', JSON.stringify(userObj));
        toast.success('Successfully signed in!');
        return true;
      }
    }
    toast.error('Invalid OTP');
    return false;
  };

  const signup = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (result.user) {
        // Update the user profile with the name
        // Note: You might want to use updateProfile here if needed
        toast.success('Account created successfully!');
        return true;
      }
      return false;
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email already exists');
      } else {
        toast.error(error.message || 'Failed to create account');
      }
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error('Failed to sign out');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }

  return (
    <AuthContext.Provider value={{ user, login, loginWithPhone, loginWithGoogle, signup, logout, isAuthenticated: !!user }}>
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
