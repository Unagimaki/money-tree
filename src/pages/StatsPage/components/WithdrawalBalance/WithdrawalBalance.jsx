import { useEffect, useState } from 'react'
import styles from './withdrawalBalance.module.scss'
import { calcProcentFromNum } from './helpers/calcProcentFromNum'
import { Balance } from '../../../../features/components/Balance/Balance'
import { useSelector } from 'react-redux'

export const WithdrawalBalance = () => {
    const clock = require('../../assets/clock.png')

    const WEEK_LIMIT = 5
    const UNLIMITED = 35
    const currentCourse = useSelector(state => state?.season?.course)
    const balance = useSelector((state) => state.user.player.balance);
    const currentSum = balance * currentCourse

    const isBalanceAtOrAboveLimit = currentSum >= UNLIMITED
    console.log(isBalanceAtOrAboveLimit);

    const [fullnessWidth, setFullnessWidth] = useState(0)
    const [limitLineLeftPos, setLimitLineLeft] = useState(0)

    useEffect (() => {
        const fullness = calcProcentFromNum(currentSum, UNLIMITED)
        const minLimit = calcProcentFromNum(WEEK_LIMIT, UNLIMITED)
        setFullnessWidth(fullness)
        setLimitLineLeft(minLimit)  
    }, []);

    return(
        <div className={styles.container}>
            <div className={styles.container_inner}>

                <div className={styles.container_inner_title}>Ваш баланс</div>

                <div className={styles.container_inner_line}>
                        {
                            isBalanceAtOrAboveLimit ? 
                            <div className={styles.container_inner_line_balance}>${currentSum.toFixed(1)}</div> :
                            <>
                                <div style={{left: `${limitLineLeftPos}%`}} className={styles.container_inner_line_limit_line}/>
                                <div className={styles.container_inner_line_limit_num}>{WEEK_LIMIT}$</div>
                                <div className={styles.container_inner_line_balance_num}>${currentSum.toFixed(3)} / {UNLIMITED}</div>
                            </>

                        }

                    <div
                        style={{
                            width: `${fullnessWidth}%`,
                            borderTopLeftRadius: 'inherit',  // Всегда скругление для верхнего левого угла
                            borderBottomLeftRadius: 'inherit',  // Всегда скругление для нижнего левого угла
                            borderTopRightRadius: isBalanceAtOrAboveLimit ? 'inherit' : '0',  // Если condition true, скругление для верхнего правого угла
                            borderBottomRightRadius: isBalanceAtOrAboveLimit ? 'inherit' : '0',  // Если condition true, скругление для нижнего правого угла
                        }} 
                        className={styles.container_inner_line_fullness}
                    />

                </div>

                <div className={styles.container_inner_info}>
                    <div className={styles.container_inner_info_limits}>
                        Лимит в неделю - $5 <br/>
                        Безлимитно - от $35
                    </div>
                    <div className={styles.container_inner_info_time_left}>
                        <div>3 дн.</div>
                        <img src={clock} alt="clock" />
                    </div>
                </div>

            </div>
        </div>
    )
}