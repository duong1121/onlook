'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { SignInMethod } from '@onlook/models/auth';
import localforage from 'localforage';
import { devLogin, login } from '../login/actions';
const LAST_SIGN_IN_METHOD_KEY = 'lastSignInMethod';

interface AuthContextType {
    isPending: boolean;
    lastSignInMethod: SignInMethod | null;
    isAuthModalOpen: boolean;
    setIsAuthModalOpen: (open: boolean) => void;
    handleLogin: (method: SignInMethod) => void;
    handleDevLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [lastSignInMethod, setLastSignInMethod] = useState<SignInMethod | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    useEffect(() => {
        localforage.getItem(LAST_SIGN_IN_METHOD_KEY).then((lastSignInMethod: unknown) => {
            setLastSignInMethod(lastSignInMethod as SignInMethod | null);
        });
    }, []);

    const handleLogin = async (method: SignInMethod) => {
        setIsPending(true);
        await login(method);

        localforage.setItem(LAST_SIGN_IN_METHOD_KEY, method);
        setTimeout(() => {
            setIsPending(false);
        }, 5000);
    };

    const handleDevLogin = async () => {
        setIsPending(true);
        await devLogin();
        setTimeout(() => {
            setIsPending(false);
        }, 5000);
    };

    return (
        <AuthContext.Provider
            value={{
                isPending,
                lastSignInMethod,
                handleLogin,
                handleDevLogin,
                isAuthModalOpen,
                setIsAuthModalOpen,
            }}
            data-oid="-iwxk5x"
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a AuthProvider');
    }
    return context;
};
