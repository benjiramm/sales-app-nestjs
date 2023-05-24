
import styles from './leaderboard.module.css'

const LeaderboardRow = ({staff_name: name,score,sales, _id} : any) => {


    return <div className={styles.leaderboard_row}>
        <h2>{name}</h2>
        <div className={styles.guide}/>
        <h2>{score}</h2>
    </div>
}

export default LeaderboardRow