import { BalanceModule } from '../../modules/BalanceModule/BalanceModule'
import { FooterMenuModule } from '../../modules/FooterMenuModule/FooterMenuModule'
import { TreeModule } from '../../modules/TreeModule/TreeModule'
import styles from './shopPage.module.scss'

export const ShopPage = () => {
    return(
        <div className={styles.shop_page}>
            <BalanceModule/>
            <TreeModule/>
            <FooterMenuModule/>
        </div>
    )
}