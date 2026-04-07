export type VerifyType = {
    tokens : {
        refresh: string,
        access: string
    },
    userId: number
}

export type LoginType = {
    tokens : {
        refresh: string,
        access: string
    },
    userId: number,
    email: string,
    role: string[]
}

export type refreshTokenResponseType = {
    access: string,
}