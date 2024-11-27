import styles from './statPage.module.scss'
import { StatTitle } from './components/StatTitle/StatTitle'
import { StatCount } from './components/StatCount/StatCount'
import { StatList } from './components/StatList/StatList'
import { BackButton } from '@vkruglikov/react-telegram-web-app'
import { useEffect } from 'react'
import { getData } from '../../services/getData'
import { useDispatch, useSelector } from 'react-redux'
import { actionSetPlayersTop } from '../../state/reducers/statsReducer/actions'
import { actionSetConnectModalVisible } from '../../state/reducers/walletReducer/actions'
import { StatCourse } from './components/StatCourse/StatCourse'

const StatPage = ({navigate}) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const connectWalletVisible = useSelector(state => state.wallet.isVisible)

    const handleBackButtonClick = () => {
      connectWalletVisible ?
      dispatch(actionSetConnectModalVisible(false)) :
      navigate('/main')
    }

    useEffect(() => {        
        getData(token, 'player/top')
        .then((res) => {          
            dispatch(actionSetPlayersTop(res.data))
        })
        .catch(e => {
            console.log('get players stats error');
        })
    }, [])
    
    return (
      <div className={styles.stat_page}>
        <StatTitle />
        <StatCount />
        <StatCourse />
        <StatList />
        <BackButton onClick={handleBackButtonClick} />
      </div>
    );
}
export default StatPage