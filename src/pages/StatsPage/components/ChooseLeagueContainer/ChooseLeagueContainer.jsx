import React from 'react'
import styles from './chooseLeagueContainer.module.scss'
import { LeagueItem } from './components/LeagueItem/LeagueItem'

export const ChooseLeagueContainer = ({currentLeague}) => {
    const first = require('./assets/1.png')
    const second = require('./assets/2.png')
    const third = require('./assets/3.png')
    const fourth = require('./assets/4.png')
    const fifth = require('./assets/5.png')
    return(
        <div className={styles.container}>
            <div className={styles.container_inner}>
                <LeagueItem img={first} leagueNum={1}/>
                <LeagueItem img={second} leagueNum={2}/>
                <LeagueItem img={third} leagueNum={3}/>
                <LeagueItem img={fourth} leagueNum={4}/>
                <LeagueItem img={fifth} leagueNum={5}/>
            </div>
        </div>
    )
}