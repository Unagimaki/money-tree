import { BalanceModule } from '../../modules/BalanceModule/BalanceModule'
import { MainPageContainer } from './components/MainPageContainer/MainPageContainer'
import { MainPageFooter } from './components/MainPageFooter/MainPageFooter'
import { MainPageHeader } from './components/MainPageHeader/MainPageHeader'
import styles from './mainPage.module.scss'

export const MainPage = () => {
    return(
        <div className={styles.main_page}>
            <MainPageHeader/>
            <BalanceModule/>
            <MainPageContainer/>
            <MainPageFooter/>
        </div>
    )
}

