import { MainDamageContainer } from './MainDamageContainer/MainDamageContainer'
import { MainEnergyContainer } from './MainEnergyContainer/MainEnergyContainer'
import styles from './mainPageHeader.module.scss'

export const MainPageHeader = () => {
    return(
        <div className={styles.header}>
            <MainDamageContainer/>
            <MainEnergyContainer/>
        </div>
    )
}