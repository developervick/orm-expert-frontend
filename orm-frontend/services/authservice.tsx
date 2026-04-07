"use client";
import { createContext, useContext, useState, ReactNode} from "react";
import ky from "ky";
import Cookies from 'js-cookie';
import { ApiResponseType } from "@/types/interface";
import { SignupType } from "@/types/types";
import { VerifyType, LoginType } from "@/types/api";
import {HTTPError} from 'ky'
import { getMinutesFromNow } from "@/lib/utils";
type AuthContextType = {
    userId: number | null;
    loading: boolean;
    error: unknown | null;
    email: string | null;
    user: LoginType | null;
    is_loggedIn: boolean;
    loginAction: (email: string, password: string) => Promise<{ success: boolean, data?: ApiResponseType<LoginType> | ApiResponseType<unknown>}>;
    setEmail: (email: string) => void;
    signup: (name: string, email: string, password: string, confirmPassword: string) => Promise<{ success: boolean, data?: ApiResponseType<SignupType> | ApiResponseType<unknown>}>;
    verifyOTP: (otp: string, uuid: string) => Promise<{ success: boolean, data?: ApiResponseType<VerifyType> | ApiResponseType<unknown>}>;
}

const AuthContext = createContext<AuthContextType | null>(null);


const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<number | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown | null>(null);
    const [is_loggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<LoginType | null>(null);


    const loginAction = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await ky.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/login/`, {
                json: { email, password }
            });
            const data = await response.json<ApiResponseType<LoginType>>();
            setUser(data.data);
            setUserId(data.data.userId);
            Cookies.set('accessToken', data.data.tokens.access, { expires: 30, sameSite: 'strict' });
            Cookies.set('refreshToken', data.data.tokens.refresh, { expires: 30, sameSite: 'strict' });
            Cookies.set('userId', JSON.stringify(data.data.userId), { expires: 30, sameSite: 'strict' });
            setIsLoggedIn(true);
            return { success: true, data: data };
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
            return { success: false, data: error instanceof HTTPError ? await error.response.json() : 'An unknown error occurred' };
        } finally {
            setLoading(false);
        }
    }

    const signupAction = async (name: string, email: string, password: string, confirm_password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await ky.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/signup/`, {
                json: { name, email, password, confirm_password}
            });
            const data = await response.json<ApiResponseType<SignupType>>();
            Cookies.set('verify_uuid', data.data.uuid, { expires: getMinutesFromNow(10), sameSite: 'strict'});
            return { success: true, data: data };
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
            return { success: false, data: error instanceof HTTPError ? await error.response.json() : 'An unknown error occurred' };
        } finally {
            setLoading(false);
        }
    };
    const verifyOTP = async (otp: string, uuid: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await ky.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/signup/verify-otp/`, {
                json: {
                    otp,
                    uuid
                },
            });
            const res = await response.json<ApiResponseType<VerifyType>>();
            setUserId(res.data.userId);
            Cookies.set('accessToken', res.data.tokens.access, { expires: 30, sameSite: 'strict' });
            Cookies.set('refreshToken', res.data.tokens.refresh, { expires: 30, sameSite: 'strict' });
            Cookies.set('userId', JSON.stringify(res.data.userId), { expires: 30, sameSite: 'strict' });
            setIsLoggedIn(true);
            return { success: true, data: res };
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
            return { success: false, data: error instanceof HTTPError ? await error.response.json() : 'An unknown error occurred' };
        } finally {
            setLoading(false);
        }
    };

    const value: AuthContextType = {
        userId,
        loading,
        error,
        email,
        user,
        is_loggedIn,
        loginAction,
        setEmail,
        signup: signupAction,
        verifyOTP: verifyOTP
    };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthProvider;