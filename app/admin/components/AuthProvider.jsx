"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut 
} from "firebase/auth";
import { auth, isUserAuthorized, AUTHORIZED_EMAILS } from "@/app/lib/firebase";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext({
  user: null,
  loading: true,
  isAuthorized: false,
  signIn: async () => {},
  signUp: async () => {},
  resetPassword: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isAuthorized = user ? isUserAuthorized(user.email) : false;

  useEffect(() => {
    if (!loading) {
      const isLoginPage = pathname === "/admin/login" || pathname === "/admin/login/";
      if (!user && !isLoginPage && pathname.startsWith("/admin")) {
        router.push("/admin/login");
      } else if (user && isAuthorized && isLoginPage) {
        router.push("/admin");
      }
    }
  }, [user, isAuthorized, loading, pathname, router]);

  const signIn = async (email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!isUserAuthorized(trimmedEmail)) {
      throw new Error(`O e-mail ${trimmedEmail} não está na lista de administradores autorizados.`);
    }
    const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, password);
    return userCredential.user;
  };

  const signUp = async (email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!isUserAuthorized(trimmedEmail)) {
      throw new Error(`O e-mail ${trimmedEmail} não tem permissão para cadastrar como administrador.`);
    }
    const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
    return userCredential.user;
  };

  const resetPassword = async (email) => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!isUserAuthorized(trimmedEmail)) {
      throw new Error(`O e-mail ${trimmedEmail} não está na lista de administradores autorizados.`);
    }
    await sendPasswordResetEmail(auth, trimmedEmail);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    router.push("/admin/login");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthorized, 
      signIn, 
      signUp,
      resetPassword,
      signOut, 
      AUTHORIZED_EMAILS 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
