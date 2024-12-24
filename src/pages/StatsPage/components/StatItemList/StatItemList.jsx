import { useDispatch, useSelector } from 'react-redux'
import styles from './statItemList.module.scss'
import { StatItem } from './components/StatItem/StatItem'
import { useEffect, useState } from 'react'
import { actionSetCurrentLeague, actionSetFriends, actionSetLeagues } from '../../../../state/reducers/leagueReducer/leagueReducer'
import { getPlayersTop } from '../../services/getPlayersTop'
import { getData } from '../../../../services/getData'

export const StatItemList = ({currentListType}) => {
  const players = useSelector(state => state.league?.leagues.topPlayers)
  const friends = useSelector(state => state.league.friends.topPlayers)
   
  const currentUser = useSelector(state => state.playersTop?.currentUser)
  const currentLeague = useSelector(state => state.league.showCurrentLeague)
  const token = useSelector(state => state.user.token)

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentListType === 'friends') {
      return
    }
    dispatch(actionSetCurrentLeague(currentLeague))

    getPlayersTop(token, currentLeague)
    .then((res) => {
      dispatch(actionSetLeagues(res.data))
      console.log(`Получены общие лиги ${currentLeague}`);
    })
    .catch(e => console.log('StatPage: get players stats error: ' + e))
    .finally(() => setLoading(false))

  }, [currentLeague, currentListType])
  
  // получение списка друзей текущей лиги
  useEffect(() => {
    if (currentListType === 'all') {
      return
    }
    getData(token, `player/top?league=${currentLeague}&isFriends=true`)
    .then(res => {
      console.log(`Получены друзья лиги ${currentLeague}`);
      console.log(res.data);
      
      dispatch(actionSetFriends(res.data))     
    })
    .catch(e => console.log(e))
  }, [currentListType, currentLeague])
  

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
          currentListType === 'all' ?
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
          :
          friends && !loading &&
          friends.map((player, index) => {
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