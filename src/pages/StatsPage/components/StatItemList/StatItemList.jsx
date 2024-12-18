import { useDispatch, useSelector } from 'react-redux'
import styles from './statItemList.module.scss'
import { StatItem } from './components/StatItem/StatItem'
import { useEffect, useState } from 'react'
import { actionSetCurrentLeague } from '../../../../state/reducers/leagueReducer/leagueReducer'
import { actionSetPlayersTop } from '../../../../state/reducers/statsReducer/actions'
import { getPlayersTop } from '../../services/getPlayersTop'
import { getPageForLeague } from '../../helpers/getPageForLeague'

export const StatItemList = () => {
  const players = useSelector(state => state.playersTop?.topPlayers)
  const currentUser = useSelector(state => state.playersTop?.currentUser)
  const currentLeague = useSelector(state => state.league.showCurrentLeague)
  const token = useSelector(state => state.user.token)

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    dispatch(actionSetCurrentLeague(currentLeague))
   

    getPlayersTop(token, getPageForLeague(currentLeague))
    .then((res) => dispatch(actionSetPlayersTop(res.data)))
    .catch(e => console.log('StatPage: get players stats error: ' + e))
    .finally(() => setLoading(false))

  }, [currentLeague])
  

  return (
    <div className={styles.list}>
      <div className={styles.list_wrapper}>
        {
          loading &&
          <div className={styles.list_wrapper_loader_wrapper}>
            <div className={styles.list_wrapper_loader_wrapper_loader}/>
          </div>
        }
        {
          currentUser && !loading &&
          <div className={styles.list_wrapper_item}>
            <StatItem
              balance={currentUser.balance}
              name={currentUser.userName}
              rank={currentUser.rank}
              imgUrl={currentUser.profileImageUrl}
            />
          </div>
        }
        {
          players && !loading &&
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