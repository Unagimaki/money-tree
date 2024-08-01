import { Link } from 'react-router-dom'
import styles from './mainEnergy.module.scss'

export const MainEnergyContainer = () => {
    const img  = require('../../../assets/energy_icon.png')
    return(
        <Link className={styles.energy} to={'/boosts'} >
            <img className={styles.energy_img} src={img} alt="energy_icon" />
            <div className={styles.energy_count}>
                <div className={styles.energy_text}>
                    999/1000
                </div>
            </div>
        </Link>
    )
}