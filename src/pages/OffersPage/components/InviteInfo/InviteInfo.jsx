import { tg_img } from '../../offersImages'
import styles from './inviteContainer.module.scss'

export const InviteInfo = () => {

    const money = require('../../assets/money.png')

    return(
        <div className={styles.container}>
            <div className={styles.container_info}>
                <div className={styles.container_info_title}>Invite a friend</div>
                <div className={styles.container_info_text}>
                    <img src={money} alt="money" />
                    <span>+100,000</span>&nbsp; для тебя и друга</div>
            </div>
            <div className={styles.container_tg_image}>
                <img src={tg_img.url} alt="tg_img" />
            </div>
        </div>
    )
}