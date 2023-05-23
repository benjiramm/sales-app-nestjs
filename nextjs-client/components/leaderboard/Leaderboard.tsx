import { useGetLeaderboard } from "../../hooks/useLeaderboard"
import { useQuery } from "@tanstack/react-query"
import axios from 'axios'

interface leaderboardProps {
    date: Date
}
const Leaderboard = ({date}: leaderboardProps) => {
    const leaderboard = useGetLeaderboard(date)
    return <>
    <p>{JSON.stringify(leaderboard.data)}</p>
    </>
}

export default Leaderboard