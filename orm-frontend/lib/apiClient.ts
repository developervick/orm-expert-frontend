"use client"
import ky from 'ky'
import {getRefreshToken}  from './getToken'
import { ResponsePromise, KyResponse } from 'ky';

let refreshPromise: ResponsePromise | null = null;

let getToken: () => string | null = () => null;

export const setTokenGetter = (fn: () => string | null) => {
    getToken = fn;
};

const apiClient = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_BACKEND_API,
    retry: {
        limit: 1,
        statusCodes: [401],
        methods: ['get', 'post', 'put', 'delete', 'patch', 'options']
    },
    hooks:{
        beforeRequest: [
            (request) => {
                const token = getToken()
                if(token){
                    request.headers.set('Authorization', `Bearer ${token}`)
                }
            },
        ],
        beforeRetry: [
            async ({request, retryCount}) => {
                try{
                    console.log(`Token refersh attemp ${retryCount}`)
                    if(!refreshPromise){
                        refreshPromise = ky.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/refreshToken`, {
                        json: {
                            refresh_token: getRefreshToken()
                        }
                    }).json().finally(()=>{
                        refreshPromise = null
                    })
                    }
                    const refreshed : KyResponse = await refreshPromise
                
                    localStorage.setItem('accessToken', refreshed.access_token)
                    request.headers.set('Authorization', `Bearer ${refreshed.access_token}`)
                }
                catch(e: unknown){
                    localStorage.removeItem('access_token')
                    localStorage.removeItem('refresh_token')
                    window.location.href = '/login'
                    console.log(e)
                }
            }
        ]
    }
    
})

export default apiClient