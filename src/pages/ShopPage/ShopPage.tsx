import { BalanceModule } from '../../modules/BalanceModule/BalanceModule'
import { FriendsCountContainer } from './FriendsCountContainer/FriendsCountContainer'
import styles from './shopPage.module.scss'
import { SkinList } from './SkinList/SkinList'

export const ShopPage = () => {
    return(
        <div className={styles.shop_page}>
            <BalanceModule top='5.42%'/>
            <FriendsCountContainer/>
            <SkinList/>
        </div>
    )
}