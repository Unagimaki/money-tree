import styles from './statPage.module.scss'
import { StatTitle } from './components/StatTitle/StatTitle'
import { StatCount } from './components/StatCount/StatCount'
import { BackButton } from '@vkruglikov/react-telegram-web-app'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionSetConnectModalVisible } from '../../state/reducers/walletReducer/actions'
import { StatCourse } from './components/StatCourse/StatCourse'
import { ChooseLeagueContainer } from './components/ChooseLeagueContainer/ChooseLeagueContainer'
import { StatItemList } from './components/StatItemList/StatItemList'
import { StatItemListType } from './components/StatItemList/components/StatItemListType/StatItemListType'

const StatPage = ({navigate}) => {
    const dispatch = useDispatch()
    const connectWalletVisible = useSelector(state => state.wallet.isVisible)
    
    const [currentListType, setCurrentListType] = useState('all')
    const [isLoading, setIsLoading] = useState(true)

    const handleChangeListType = (type) => {      
      setCurrentListType(type)
    }
    const handleChangeLoading = (boolean) => {
      setIsLoading(boolean)
    }
    const handleBackButtonClick = () => {
      connectWalletVisible ? dispatch(actionSetConnectModalVisible(false)) : navigate('/main')
    }
    
    return (
      <div className={styles.stat_page}>
        <StatTitle/>
        <StatCount/>
        <StatCourse/>
        <ChooseLeagueContainer handleChangeLoading={handleChangeLoading} isLoading={isLoading}/>
        <StatItemListType isLoading={isLoading} handleChangeLoading={handleChangeLoading} handleChangeListType={handleChangeListType} currentListType={currentListType}/>
        <StatItemList handleChangeLoading={handleChangeLoading} isLoading={isLoading} currentListType={currentListType}/>
        <BackButton onClick={handleBackButtonClick} />
      </div>
    );
}
export default StatPage