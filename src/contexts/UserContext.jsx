import React, { createContext, useState, useEffect, useContext } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    if (currentUser) {
      setLoading(true);
      const userDocRef = doc(db, "users", currentUser.uid);
      
      // onSnapshot listens for realtime updates
      unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such user document!");
          setUserData(null);
        }
        setLoading(false);
      }, (error) => {
        console.error("Failed to fetch user data:", error);
        setLoading(false);
      });

    } else {
      setUserData(null);
      setLoading(false);
    }
    
    // Cleanup the listener when the component unmounts or user changes
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [currentUser]);

  const value = {
    userData,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}