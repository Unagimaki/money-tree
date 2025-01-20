import styles from './LeagueItem.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actionSetCurrentLeague } from '../../../../../../state/reducers/leagueReducer/leagueReducer'

export const LeagueItem = ({isLoading, img, name}) => {
    const dispatch = useDispatch()
    const currentLeague = useSelector(state => state.league.showCurrentLeague)
    
    const handleChangeLeague = () => {
        if (isLoading) return
        dispatch(actionSetCurrentLeague(name))
    }

    return(
        <div onClick={handleChangeLeague} style={{border: currentLeague == name ? 'min(0.37vw, 1.37px) solid #8CDB4E' : '', opacity: isLoading ? 0.6 : 1}} className={styles.container}>
            <img src={img} alt='league'/>
        </div>
    )
}