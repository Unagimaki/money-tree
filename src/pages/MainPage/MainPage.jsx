import styles from './mainPage.module.scss'
import { AutoBot } from './components/AutoBot/AutoBot'
import { Balance } from '../../features/components/Balance/Balance'
import { Stats } from '../../features/components/Stats/Stats'
import { store } from '../../state/index'
import { TreeModule } from './components/TreeModule/TreeModule'
import { useEffect, useState } from 'react'
import { BackButton } from '@vkruglikov/react-telegram-web-app'
import { useDispatch, useSelector } from 'react-redux'
import { WebApp } from '../../App'
import { PagesLinks } from '../../shared/PagesLinks'
import { useNavigate } from 'react-router-dom'
import { actionHintButtonVisible, actionSetTutorialActive } from '../../state/reducers/tutorialReducer/tutorialReducer'
import { DailyBonusIcon } from './components/DailyBonus/DailyBonusIcon/DailyBonusIcon'
import { DailyBonusWindow } from './components/DailyBonus/DailuBonusWindow/DailyBonusWindow'
import { MainBackground } from './components/MainBackground/MainBackground'
import Snowfall from 'react-snowfall'


const MainPage = ({ isStatModalVisible, onDamageModalShow, handleAlertModalShow }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const main_background = require("./assets/main_background.png");
  const snow_background = require("./assets/background_snow.png");
  const [isLoading, setIsLoading] = useState(true);

  const currentBotLevel = useSelector(state => state.bot.autoBots.length > 0 && state.bot.autoBots[0].currentLevel);
  const season = useSelector((state) => state?.season?.isActive);
  const isHintActive = useSelector(state => state.tutorial.isHintVisible)
  const shop = useSelector(state => state.shop)
  const regen = shop?.find(item => item.shopItem.itemType === 'REGENERATION').currentLevel
  const background = regen > 0 ? require(`./assets/regen/${regen}.png`) : snow_background;

  console.log(store.getState());
  
  const handleButtonClick = () => { isStatModalVisible ? onDamageModalShow() : WebApp.close() };
 
  useEffect(() => {
    const isTutorialDone = JSON.parse(localStorage.getItem('isTutorialDone')) || false;   
    !isTutorialDone && dispatch(actionSetTutorialActive(true))
  }, [])

  useEffect(() => { isHintActive.toMainButton && dispatch(actionHintButtonVisible(false, false)) }, [])
  useEffect(() => {if (!season) { navigate(PagesLinks.SEASON_URL) }}, [season])

  useEffect(() => {
    const img = new Image();
    img.src = snow_background;
    img.onload = () => setIsLoading(false)
    img.onerror = () => setIsLoading(false)
  }, [snow_background]);  

  return (
    <div>
      <div className={styles.main_page}>
        <MainBackground main_background={snow_background} img={background} isLoading={isLoading}/>
        <AutoBot currentBotLevel={currentBotLevel} handleAlertModalShow={handleAlertModalShow}/>
        <Stats onDamageModalShow={onDamageModalShow}/>
        <Balance />
        <TreeModule shop={shop} state={store.getState()}/>
        <DailyBonusIcon/>
        <DailyBonusWindow handleAlertModalShow={handleAlertModalShow}/>
        {isStatModalVisible && <BackButton onClick={handleButtonClick}/>}
      </div>
    </div>
  );
};

export default MainPage;