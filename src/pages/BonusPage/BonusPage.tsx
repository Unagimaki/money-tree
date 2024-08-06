import { BalanceModule } from '../../modules/BalanceModule/BalanceModule'
import { TreeModule } from '../../modules/TreeModule/TreeModule'
import styles from './bonusPage.module.scss'

export const BonusPage = () => {
    return(
        <div className={styles.bonus_page}>
            <BalanceModule/>
            <TreeModule/>
        </div>
    )
}