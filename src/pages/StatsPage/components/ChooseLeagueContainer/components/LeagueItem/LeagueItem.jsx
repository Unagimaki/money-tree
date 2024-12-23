import React from 'react'
import styles from './LeagueItem.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actionSetCurrentLeague } from '../../../../../../state/reducers/leagueReducer/leagueReducer'
import { getPlayersTop } from '../../../../services/getPlayersTop'
import { getPageForLeague } from '../../../../helpers/getPageForLeague'
import { actionSetPlayersTop } from '../../../../../../state/reducers/statsReducer/actions'

export const LeagueItem = ({img, leagueNum}) => {
    const dispatch = useDispatch()
    const currentLeague = useSelector(state => state.league.showCurrentLeague)
    const token = useSelector(state => state.user.token)

    const handleChangeLeague = () => {
        dispatch(actionSetCurrentLeague(leagueNum))
        getPlayersTop(token, getPageForLeague(leagueNum))
        .then((res) => dispatch(actionSetPlayersTop(res.data)))
        .catch(e => console.log('StatPage: get players stats error'))
    }

    return(
        <div onClick={handleChangeLeague} style={{border: currentLeague == leagueNum ? 'min(0.37vw, 1.37px) solid #8CDB4E' : ''}} className={styles.container}>
            <img src={img} alt='league'/>
        </div>
    )
}