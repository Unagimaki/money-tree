import { useDispatch, useSelector } from 'react-redux'
import styles from './statItemList.module.scss'
import { StatItem } from './components/StatItem/StatItem'
import { useEffect, useRef } from 'react'
import { actionSetCurrentPage, actionSetCurrentLeague, actionSetFriends, actionSetLeagues, actionUpdateLeagues } from '../../../../state/reducers/leagueReducer/leagueReducer'
import { getPlayersTop } from '../../services/getPlayersTop'
import { getData } from '../../../../services/getData'
import { Loader } from '../Loader/Loader'

export const StatItemList = ({handleChangeLoading, isLoading, currentListType}) => {
  const topPlayers = useSelector(state => state.league?.leagues.topPlayers)
  const friends = useSelector(state => state.league.friends.topPlayers)
  const currentUser = useSelector(state => state.league.leagues.currentUser)
  const currentLeague = useSelector(state => state.league.showCurrentLeague)
  const currentPage = useSelector(state => state.league.currentPage)
  const token = useSelector(state => state.user.token)
  const listRef = useRef(null);
  const wrapperRef = useRef(null);
  const dispatch = useDispatch()

  const loadMoreData = () => {       
    getPlayersTop(token, currentLeague, 1 * (currentPage + 1))
      .then(res => {
        console.log(res.data.topPlayers);
        
        dispatch(actionUpdateLeagues(res.data.topPlayers));  // Обновляем данные в Redux
        dispatch(actionSetCurrentPage(currentPage + 1))        
      })
      .catch((e) => console.log(e));
  };

  const handleScroll = () => {
    const bottom = listRef.current.scrollHeight === listRef.current.scrollTop + listRef.current.clientHeight;
    if (bottom) {
      console.log('Прокручено');
      loadMoreData()
    }
  };

  useEffect(() => {
    if (isLoading) return
    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener('scroll', handleScroll);
    }

    // Убираем обработчик при размонтировании компонента
    return () => {
      if (listElement) {
        listElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isLoading, currentPage]);

  // при переключении номера лиги или типа, сбрасываем счетчик страниц
  useEffect(() => {
    dispatch(actionSetCurrentPage(1))
  }, [currentListType, currentLeague])

  // если нужно показать друзей
  useEffect(() => {
    handleChangeLoading(true)
    if (currentListType === 'friends') return

    dispatch(actionSetCurrentLeague(currentLeague))
    getPlayersTop(token, currentLeague)
    .then((res) => {
      dispatch(actionSetLeagues(res.data))
      console.log(`Получены общие лиги ${currentLeague}`);
    })
    .catch(e => console.log('StatPage: get players stats error: ' + e))
    .finally(() => handleChangeLoading(false))

  }, [currentLeague, currentListType])
  
  // если нужно показать топ игроков
  useEffect(() => {
    handleChangeLoading(true)
    if (currentListType === 'all') return

    getData(token, `player/top?league=${currentLeague}&isFriends=true`)
    .then(res => {
      dispatch(actionSetFriends(res.data))     
      console.log(`Получены друзья лиги ${currentLeague}`);      
    })
    .catch(e => console.log(e))
    .finally(() => handleChangeLoading(false))
  }, [currentListType, currentLeague])

  

  return (
    <div ref={listRef} className={styles.list}>
      <div ref={wrapperRef} className={styles.list_wrapper}>
        { isLoading && <Loader/> }
        {
          currentUser && !isLoading && currentLeague === currentUser.league &&
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
          topPlayers && !isLoading &&
          topPlayers.map((player, index) => {
            return (
              <StatItem
                balance={player.balance}
                name={player.userName}
                rank={player.rank}
                imgUrl={player.profileImageUrl}
                key={index}
              />
            )
          })
          :
          friends && !isLoading &&
          friends.map((player, index) => {
            return (
              <StatItem
                balance={player.balance}
                name={player.userName}
                rank={player.rank}
                imgUrl={player.profileImageUrl}
                key={index}
              />
            )  
          })
        }
      </div>
    </div>
  )
}