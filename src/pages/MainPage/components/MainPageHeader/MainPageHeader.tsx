import { MainCoins } from './MainCoins/MainCoins'
import { MainDamage } from './MainDamage/MainDamage'
import { MainEnergy } from './MainEnergy/MainEnergy'
import './mainPageHeader.css'

export const MainPageHeader = () => {
    return(
        <div className="main_header">
            <MainDamage/>
            <MainCoins/>
            <MainEnergy/>
        </div>
    )
}