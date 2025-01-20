import React, { useState } from 'react'
import styles from './chooseLeagueContainer.module.scss'
import { LeagueItem } from './components/LeagueItem/LeagueItem'

export const ChooseLeagueContainer = ({handleChangeLoading, isLoading}) => {
    const first = require('./assets/1.png')
    const second = require('./assets/2.png')
    const third = require('./assets/3.png')
    const fourth = require('./assets/4.png')
    const fifth = require('./assets/5.png')

    return(
        <div className={styles.container}>
            <div className={styles.container_inner}>
                <LeagueItem handleChangeLoading={handleChangeLoading} isLoading={isLoading} img={first} leagueNum={1} name={'bronze'}/>
                <LeagueItem handleChangeLoading={handleChangeLoading} isLoading={isLoading} img={second} leagueNum={2} name={'silver'}/>
                <LeagueItem handleChangeLoading={handleChangeLoading} isLoading={isLoading} img={third} leagueNum={3} name={'gold'}/>
                <LeagueItem handleChangeLoading={handleChangeLoading} isLoading={isLoading} img={fourth} leagueNum={4} name={'platinum'}/>
                <LeagueItem handleChangeLoading={handleChangeLoading} isLoading={isLoading} img={fifth} leagueNum={5} name={'diamond'}/>
            </div>
        </div>
    )
}