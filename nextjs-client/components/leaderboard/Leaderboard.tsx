import { useGetLeaderboard } from "../../hooks/useLeaderboard"
import { useQuery } from "@tanstack/react-query"
import axios from 'axios'
import styles from './leaderboard.module.css'
import LeaderboardRow from "./LeaderboardRow"

interface leaderboardProps {
    date: Date
}
const Leaderboard = ({date}: leaderboardProps) => {
    const {isError, isLoading, isSuccess, data: leaderboard} = useGetLeaderboard(date)
    
    
    return <>
    <div className={styles.sales_list}>
        {isSuccess ? leaderboard.map(row => 
        <>
            <LeaderboardRow {...row} />
        </>): <></>}
    </div>
    </>
}

export default Leaderboard