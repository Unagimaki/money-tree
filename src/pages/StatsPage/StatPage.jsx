import styles from './statPage.module.scss'
import { StatTitle } from './components/StatTitle/StatTitle'
import { StatCount } from './components/StatCount/StatCount'
import { BackButton } from '@vkruglikov/react-telegram-web-app'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionSetConnectModalVisible } from '../../state/reducers/walletReducer/actions'
import { StatCourse } from './components/StatCourse/StatCourse'
import { ChooseLeagueContainer } from './components/ChooseLeagueContainer/ChooseLeagueContainer'
import { StatItemList } from './components/StatItemList/StatItemList'
import { StatItemListType } from './components/StatItemList/components/StatItemListType/StatItemListType'
import { getLeagueFromUserNumber } from './helpers/getLeagueFromUserNumber'
import { actionSetCurrentLeague } from '../../state/reducers/leagueReducer/leagueReducer'

const StatPage = ({navigate}) => {
    const dispatch = useDispatch()
    const connectWalletVisible = useSelector(state => state.wallet.isVisible)
    const currentUser = useSelector(state => state.playersTop?.currentUser)
    const [currentListType, setCurrentListType] = useState('all')

    const handleChangeListType = (type = 'all') => {      
      setCurrentListType(type)
    }
    const handleBackButtonClick = () => {
      connectWalletVisible ?
      dispatch(actionSetConnectModalVisible(false)) :
      navigate('/main')
    }

    // useEffect(() => {
    //   dispatch(actionSetCurrentLeague(getLeagueFromUserNumber(currentUser.rank)))
    // }, [])
    
    return (
      <div className={styles.stat_page}>
        <StatTitle/>
        <StatCount/>
        <StatCourse/>
        <ChooseLeagueContainer/>
        <StatItemListType handleChangeListType={handleChangeListType} currentListType={currentListType}/>
        <StatItemList/>
        <BackButton onClick={handleBackButtonClick} />
      </div>
    );
}
export default StatPage