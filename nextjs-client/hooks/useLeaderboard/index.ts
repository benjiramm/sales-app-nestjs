import { useQuery, UseQueryResult } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"

export const useGetLeaderboard = (date: Date) : UseQueryResult<Array<any>> => 
    useQuery(
        [`leaderboard-${date}`],
        async () => {
            const res = await axios.get('http://localhost:3000/leaderboard')
            return res.data
        },
        {
            onSuccess: data => data,
            onError: error => [],
            refetchOnWindowFocus: true
        }
    )
    