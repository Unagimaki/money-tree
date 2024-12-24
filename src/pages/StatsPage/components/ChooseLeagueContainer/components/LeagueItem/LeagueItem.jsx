import React, { useState } from 'react'
import styles from './LeagueItem.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actionSetCurrentLeague } from '../../../../../../state/reducers/leagueReducer/leagueReducer'
import { getPageForLeague } from '../../../../helpers/getPageForLeague'
import { getPlayersTop } from '../../../../services/getPlayersTop'

export const LeagueItem = ({isLoading, handleChangeLoading, img, leagueNum, name}) => {
    const dispatch = useDispatch()
    const currentLeague = useSelector(state => state.league.showCurrentLeague)
    const token = useSelector(state => state.user.token)
    
    const handleChangeLeague = () => {
        if (isLoading) return
        handleChangeLoading(true)
        dispatch(actionSetCurrentLeague(name))
        getPlayersTop(token, getPageForLeague(leagueNum))
        // .then((res) => dispatch(actionSetPlayersTop(res.data)))
        .catch(e => console.log('StatPage: get players stats error: ' + e))
        .finally(() => handleChangeLoading(false))
    }

    return(
        <div onClick={handleChangeLeague} style={{border: currentLeague == name ? 'min(0.37vw, 1.37px) solid #8CDB4E' : '', opacity: isLoading ? 0.6 : 1}} className={styles.container}>
            <img src={img} alt='league'/>
        </div>
    )
}