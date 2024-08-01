import { BalanceModule } from '../../modules/BalanceModule/BalanceModule'
import { FooterMenuModule } from '../../modules/FooterMenuModule/FooterMenuModule'
import { TreeModule } from '../../modules/TreeModule/TreeModule'
import styles from './statsPage.module.scss'

export const StatsPage = () => {
    return(
        <div className={styles.stats_page}>
            <BalanceModule/>
            <TreeModule/>
            <FooterMenuModule/>
        </div>
    )
}