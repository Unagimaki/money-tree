import { Link } from 'react-router-dom'
import { BalanceModule } from '../../modules/BalanceModule/BalanceModule'
import { ModuleStats } from '../../modules/ModuleStats/ModuleStats'
import { TreeModule } from '../../modules/TreeModule/TreeModule'
import { PagesLinksEnum } from '../../shared/PagesLinks.enum'
import styles from './mainPage.module.scss'

export const MainPage = () => {
    return(
        <div className={styles.main_page}>
            <ModuleStats/>
            <BalanceModule/>
            <Link to={PagesLinksEnum.GAME_URL}>
                <TreeModule />
            </Link>
        </div>
    )
}

