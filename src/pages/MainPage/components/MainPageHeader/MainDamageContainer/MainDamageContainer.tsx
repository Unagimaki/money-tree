import { Link } from 'react-router-dom'
import styles from './mainDamage.module.scss'

export const MainDamageContainer = () => {
    const img  = require('../../../assets/damage_icon.png')
    return(
        <Link className={styles.damage} to={'/boosts'}>
            <img className={styles.damage_img} src={img} alt="damage_icon" />
            <div className={styles.damage_count}>
                <div className={styles.damage_text}>1,000,000</div>
            </div>
        </Link>
    )
}