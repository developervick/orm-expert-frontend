"use client";
import { createContext, useContext, useState, ReactNode, useEffect, useRef} from "react";
import ky from "ky";
import Cookies from 'js-cookie';
import { ApiResponseType } from "@/types/interface";
import { SignupType } from "@/types/types";
import { VerifyType, LoginType, refreshTokenResponseType } from "@/types/api";
import {HTTPError} from 'ky'
import { getMinutesFromNow } from "@/lib/utils";
import { toast } from "react-toastify";
import useLocalStorageState from "@/hooks/localstorageHook";
import { setTokenGetter } from '@/lib/apiClient';


type AuthContextType = {
    userId: number | null;
    loading: boolean;
    error: unknown | null;
    email: string | null;
    user: LoginType | null;
    is_loggedIn: boolean;
    logoutAction: () => void; 
    loginAction: (email: string, password: string) => Promise<{ success: boolean, data?: ApiResponseType<LoginType> | ApiResponseType<unknown>}>;
    setEmail: (email: string) => void;
    signup: (name: string, email: string, password: string, confirmPassword: string) => Promise<{ success: boolean, data?: ApiResponseType<SignupType> | ApiResponseType<unknown>}>;
    verifyOTP: (otp: string, uuid: string) => Promise<{ success: boolean, data?: ApiResponseType<VerifyType> | ApiResponseType<unknown>}>;
}

const AuthContext = createContext<AuthContextType | null>(null);


const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useLocalStorageState<number | null>('userId', null);
    const [email, setEmail] = useLocalStorageState<string | null>('email', null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useLocalStorageState<unknown | null>('error', null);
    const [is_loggedIn, setIsLoggedIn] = useLocalStorageState('is_loggedIn', false);
    const [user, setUser] = useLocalStorageState<LoginType | null>('user', null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);


    console.log('AuthProvider Rendered - is_loggedIn:', is_loggedIn, 'userId:', userId);


    useEffect(() => {
        const init = async () => {
            await silentRefresh();  // uses httpOnly cookie automatically
            setLoading(false);
        };
        init();

        return () => {
            if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
        };
    }, []);

    useEffect(() => {
        setTokenGetter(() => accessToken);
    }, [accessToken]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedUserId = localStorage.getItem('userId');
        const storedIsLoggedIn = localStorage.getItem('is_loggedIn');
        const storedEmail = localStorage.getItem('email');
        const storedError = localStorage.getItem('error');

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedUserId) setUserId(JSON.parse(storedUserId));
        if (storedIsLoggedIn) setIsLoggedIn(JSON.parse(storedIsLoggedIn));
        if (storedEmail) setEmail(JSON.parse(storedEmail));
        if (storedError) setError(JSON.parse(storedError));
    }, []);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userId', JSON.stringify(userId));
        localStorage.setItem('is_loggedIn', JSON.stringify(is_loggedIn));
        localStorage.setItem('email', JSON.stringify(email));
        localStorage.setItem('loading', JSON.stringify(loading));
        localStorage.setItem('error', JSON.stringify(error));
        
    }, [user, userId, is_loggedIn, email, loading, error]);

    const silentRefresh = async (): Promise<string | null> => {
        try {
            const res = await ky.post('api/v1/token/refresh/', {
                credentials: 'include',
                prefixUrl: process.env.NEXT_PUBLIC_BACKEND_API,
            }).json<ApiResponseType<refreshTokenResponseType>>();
            setAccessToken(res.data.access);
            scheduleRefresh(res.data.access);  // schedule next refresh
            return res.data.access;
        } catch {
            // Refresh token expired or missing — user must log in again
            setUser(null);
            setAccessToken(null);
            setIsLoggedIn(false);
            return null;
        }
    };

    const scheduleRefresh = (token: string) => {
        // Decode expiry from JWT
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiresIn = payload.exp * 1000 - Date.now();
        const refreshIn = expiresIn - 60 * 1000;  // 1 min before expiry

        // Clear existing timer
        if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);

        refreshTimerRef.current = setTimeout(() => {
            silentRefresh();
        }, refreshIn);
    };

    const loginAction = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await ky.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/login/`, {
                credentials: 'include',
                json: { email, password }
            });
            const data = await response.json<ApiResponseType<LoginType>>();
            setUser(data.data);
            setUserId(data.data.userId);
            localStorage.setItem('userId', JSON.stringify(data.data.userId));
            Cookies.set('userId', JSON.stringify(data.data.userId), { expires: 30, sameSite: 'strict' });
            setAccessToken(data.data.tokens.access);
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
                credentials: 'include',
            });
            const res = await response.json<ApiResponseType<VerifyType>>();
            setUserId(res.data.userId);
            Cookies.set('userId', JSON.stringify(res.data.userId), { expires: 30, sameSite: 'strict' });
            setAccessToken(res.data.tokens.access);
            setIsLoggedIn(true);
            return { success: true, data: res };
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
            return { success: false, data: error instanceof HTTPError ? await error.response.json() : 'An unknown error occurred' };
        } finally {
            setLoading(false);
        }
    };

    const logoutAction = async () => {
        if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
        await ky.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/logout/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            credentials: 'include',
        }).then(() => {
            setUser(null);
            setAccessToken(null);
            setUserId(null);
            setIsLoggedIn(false);
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            Cookies.remove('userId');
            localStorage.removeItem('user');
            localStorage.removeItem('userId');
            localStorage.removeItem('is_loggedIn');
            localStorage.removeItem('email');
            toast.success("Logged out successfully");
        }).catch((error) => {
            console.error("Logout failed:", error);
        });
    };

    const value: AuthContextType = {
        userId,
        loading,
        error,
        email,
        user,
        is_loggedIn,
        logoutAction,
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