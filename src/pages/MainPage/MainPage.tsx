import { BalanceModule } from '../../modules/BalanceModule/BalanceModule'
import { FooterMenuModule } from '../../modules/FooterMenuModule/FooterMenuModule'
import { TreeModule } from '../../modules/TreeModule/TreeModule'
import { MainPageHeader } from './components/MainPageHeader/MainPageHeader'
import styles from './mainPage.module.scss'

export const MainPage = () => {
    return(
        <div className={styles.main_page}>
            <MainPageHeader/>
            <BalanceModule/>
            <TreeModule/>
            <FooterMenuModule/>
        </div>
    )
}

