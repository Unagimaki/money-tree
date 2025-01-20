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
import { IntroModal } from '../../features/modals/IntroModal/IntroModal'


const MainPage = ({ isStatModalVisible, onDamageModalShow, handleAlertModalShow }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const snow_background = require("./assets/background_snow.png");
  const [isLoading, setIsLoading] = useState(true);
  const [isIntroModalVisible, setIsIntroModalVisible] = useState(false)
  const currentBotLevel = useSelector(state => state.bot?.autoBots[0]?.currentLevel > 0 );
  const season = useSelector((state) => state?.season?.isActive);
  const isHintActive = useSelector(state => state.tutorial.isHintVisible)
  const shop = useSelector(state => state.shop)
  const energy = shop?.find(item => item.shopItem.itemType === 'ENERGY').currentLevel
  const background = (energy && energy > 0) ? require(`./assets/energy_snow/${energy}.png`) : snow_background;

  const isTutorialIsActive = useSelector(state => state.tutorial.isTutorialIsActive)
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

  useEffect(() => {
    // Получаем значение introModal из localStorage
    const savedTime = localStorage.getItem('introModal');
    const isTutorialDone = JSON.parse(localStorage.getItem('isTutorialDone')) || false;   
    
    if (!isTutorialDone) return
    // Если в localStorage нет savedTime
    if (!savedTime) {
      // Показываем модалку и сохраняем текущее время
      setTimeout(() => {
        setIsIntroModalVisible(true);
        localStorage.setItem('introModal', JSON.stringify(Date.now()));
      }, 1000)
    } else {
      // Если savedTime есть, проверяем прошел ли час
      const currentTime = Date.now();
      const lastTime = JSON.parse(savedTime);
      const timeDifference = currentTime - lastTime;

      // Если прошло больше 1 часа (3600000 миллисекунд), показываем модалку
      if (timeDifference > 3600000) {
        setIsIntroModalVisible(true);
        localStorage.setItem('introModal', JSON.stringify(currentTime));
      } else {
        setIsIntroModalVisible(false);
      }
    }
  }, [isTutorialIsActive]);

  const handleIntroModalVisible = () => {
    setIsIntroModalVisible(false)
  }

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
        {isIntroModalVisible && <IntroModal handleIntroModalVisible={handleIntroModalVisible}/>}

      </div>
    </div>
  );
};

export default MainPage;