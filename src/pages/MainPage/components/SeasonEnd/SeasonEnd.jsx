import { useSelector } from 'react-redux'
import styles from './season.module.scss'

export const SeasonEnd = () => {
    const balance = useSelector(state => state.user.player.balance)
    const money = require('../../assets/money_icon.png')
    return(
        <div className={styles.container}>
            <div className={styles.container_title}>Сезон завершен</div>
            <div className={styles.container_balance_wrapper}>
                <div className={styles.container_balance_wrapper_title}>Твой баланс</div>
                <div className={styles.container_balance_wrapper_balance}>
                    <img src={money} alt="money" />
                    <div>{balance}</div>
                </div>
            </div>
            <div className={styles.container_text}>Следующий сезон стартует через <br/> 24 дня</div>
            <br/>
            <div className={styles.container_text}>Следи за новостями в нашем сообществе: <br/> @money_tree_game</div>
        </div>
    )
}