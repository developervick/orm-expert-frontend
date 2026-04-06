interface ApiResponseType<T> {
    message: string | null,
    data: T,
    error: number
}

export type { ApiResponseType }