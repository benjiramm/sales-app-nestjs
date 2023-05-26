import { useQuery, UseQueryResult } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"

export const useLogin = (body : any ): UseQueryResult<any> => 
    useQuery(
        [`login-${body.username}`],
        async () => {
            const res = await axios.post('http://localhost:3000/auth/login', body )
            return res.data
        },
        {
            onSuccess: data => data,
            onError: error => [],
            refetchOnWindowFocus: true
        }
    )
    