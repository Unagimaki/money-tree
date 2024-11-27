import { useSelector } from 'react-redux'
import { StatItem } from './StatItem/StatItem'
import styles from './statList.module.scss'

export const StatList = () => {
  const players = useSelector(state => state.playersTop?.topPlayers)
  const currentUser = useSelector(state => state.playersTop?.currentUser)
  
  return (
    <div className={styles.list}>
      <div className={styles.list_wrapper}>

        {currentUser &&
        <div className={styles.list_wrapper_item}>
          <StatItem
            balance={currentUser.balance}
            name={currentUser.userName}
            rank={currentUser.rank}
            imgUrl={currentUser.profileImageUrl}
          />
        </div>

        }

        {players &&
          players.map((player, index) => {
            return <StatItem
              balance={player.balance}
              name={player.userName}
              rank={player.rank}
              imgUrl={player.profileImageUrl}
              key={index}
            />
          })
        }
      </div>
    </div>
  )
}