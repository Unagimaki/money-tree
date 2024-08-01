import { BalanceModule } from '../../modules/BalanceModule/BalanceModule'
import { FooterMenuModule } from '../../modules/FooterMenuModule/FooterMenuModule'
import { TreeModule } from '../../modules/TreeModule/TreeModule'
import styles from './boostsPage.module.scss'

export const BoostsPage = () => {
    return(
        <div className={styles.boosts_page}>
            <BalanceModule/>
            <TreeModule/>
            <FooterMenuModule/>
        </div>
    )
}