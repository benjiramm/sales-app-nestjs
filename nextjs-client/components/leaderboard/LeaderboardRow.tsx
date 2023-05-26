
import styles from './leaderboard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LeaderboardRow = ({staff_name: name,score,sales, _id} : any) => {


    return <div className={styles.leaderboard_row}>
        <h2>{name}</h2>
        <div className={styles.guide}/>
        <div className={styles.sales} >
            {sales.map((sale : any) => {
                return <div className={styles.sale_item} key={sale.item}>
                    <FontAwesomeIcon icon="beer-mug-empty"/>
                    {" " + sale.total_amount}
                </div>
            })}
            
        </div>
        <h2>{score}</h2>
    </div>
}

export default LeaderboardRow