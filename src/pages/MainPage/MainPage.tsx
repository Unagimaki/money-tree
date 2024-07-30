import { MainPageContainer } from './components/MainPageContainer/MainPageContainer'
import { MainPageFooter } from './components/MainPageFooter/MainPageFooter'
import { MainPageHeader } from './components/MainPageHeader/MainPageHeader'
import './mainPage.css'

export const MainPage = () => {
    return(
        <div className="main_page">
            <MainPageHeader/>
            <MainPageContainer/>
            <MainPageFooter/>
        </div>
    )
}

