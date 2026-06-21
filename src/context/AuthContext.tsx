import { onAuthStateChanged } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../lib/firebase';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userRef = ref(database, 'users/' + firebaseUser.uid);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            ...data
          });
          setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};