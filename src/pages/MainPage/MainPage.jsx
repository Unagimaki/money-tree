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
import { IntroModalSecond } from '../../features/modals/IntroModalSecond/IntroModalSecond'
import { IntroModalThird } from '../../features/modals/IntroModalThird/IntroModalThird'
import { WheelIconContainer } from './components/WheelIcon/WheelIconContainer'


const MainPage = ({ isStatModalVisible, onDamageModalShow }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const main_background = require("./assets/main_background.png");
  const [isLoading, setIsLoading] = useState(true);
  const [isIntroModalVisible, setIsIntroModalVisible] = useState(false)
  const [currentModal, setCurrentModal] = useState(null)
  const currentBotLevel = useSelector(state => state.bot?.autoBots[0]?.currentLevel > 0 );
  const season = useSelector((state) => state?.season?.isActive);
  const isHintActive = useSelector(state => state.tutorial.isHintVisible)
  const shop = useSelector(state => state.shop)
  const energy = shop?.find(item => item.shopItem.itemType === 'ENERGY').currentLevel
  const background = (energy && energy > 0) ? require(`./assets/regen/${energy}.png`) : main_background;

  const isTutorialIsActive = useSelector(state => state.tutorial.isTutorialIsActive)

  console.log(store.getState());

  const handleIntroModalVisible = () => {   
    setIsIntroModalVisible(false)
  }

  const handleButtonClick = () => {
    if (isStatModalVisible) {
      onDamageModalShow()
    }
    else if (isIntroModalVisible) {
      handleIntroModalVisible()
    } else {
      WebApp.close()
    }
  };

  useEffect(() => {
    const isTutorialDone = JSON.parse(localStorage.getItem('isTutorialDone')) || false;   
    !isTutorialDone && dispatch(actionSetTutorialActive(true))
  }, [])

  useEffect(() => { isHintActive.toMainButton && dispatch(actionHintButtonVisible(false, false)) }, [])
  useEffect(() => {if (!season) { navigate(PagesLinks.SEASON_URL) }}, [season])

  useEffect(() => {
    const img = new Image();
    img.src = main_background;
    img.onload = () => setIsLoading(false)
    img.onerror = () => setIsLoading(false)
  }, [main_background]);  

  useEffect(() => {
    const isTutorialDone = JSON.parse(localStorage.getItem('isTutorialDone')) || false;

    if (!isTutorialDone) return;

    const lastModalTime = localStorage.getItem("last_modal_time");
    const currentTime = new Date().getTime();

    // Проверяем, если lastModalTime существует, вычисляем прошедшее время в минутах
    if (lastModalTime) {
      const minutesPassed = Math.floor((currentTime - lastModalTime) / (60 * 1000)); // Переводим миллисекунды в минуты
      console.log(`Прошло ${minutesPassed} минут с последнего показа модалки.`);
    }

    const oneHourInMillis = 60 * 60 * 1000;
    const oneMinuteInMillis = 60 * 1000; // 1 минута в миллисекундах

    // Проверяем, прошло ли больше часа с последнего показа
    if (lastModalTime && (currentTime - lastModalTime) < oneHourInMillis) {
      setIsIntroModalVisible(false);
      return;
    }

    // Логика показа модалки и обновления времени
    const currentModalIndex = parseInt(localStorage.getItem("current_modal_index"), 10) || 0;
    const modals = ['first_modal', 'second_modal', 'third_modal'];
    const nextModalIndex = (currentModalIndex + 1) % modals.length;
    localStorage.setItem("current_modal_index", nextModalIndex);
    setCurrentModal(modals[nextModalIndex]);
    setIsIntroModalVisible(true);
    localStorage.setItem("last_modal_time", currentTime);

  }, []);

  return (
    <div>
      <div className={styles.main_page}>
        <MainBackground img={background} isLoading={isLoading}/>
        <AutoBot currentBotLevel={currentBotLevel}/>
        <Stats onDamageModalShow={onDamageModalShow}/>
        <Balance />
        <TreeModule shop={shop} state={store.getState()}/>
        <DailyBonusIcon/>
        <DailyBonusWindow/>
        <WheelIconContainer/>
        {(isStatModalVisible || isIntroModalVisible) && <BackButton onClick={handleButtonClick}/>}
        {
          isIntroModalVisible && (
            currentModal === 'first_modal' ? <IntroModal handleIntroModalVisible={handleIntroModalVisible}/> : currentModal === 'second_modal' ? <IntroModalSecond handleIntroModalVisible={handleIntroModalVisible}/> : currentModal === 'third_modal' ? <IntroModalThird handleIntroModalVisible={handleIntroModalVisible}/> : ''
          )
        }
      </div>
    </div>
  );
};

export default MainPage;