import { BalanceModule } from '../../modules/BalanceModule/BalanceModule'
import { FooterMenuModule } from '../../modules/FooterMenuModule/FooterMenuModule'
import styles from './bonusPage.module.scss'

export const BonusPage = () => {
    return(
        <div className={styles.bonus_page}>
            <BalanceModule/>
            <FooterMenuModule/>
        </div>
    )
}