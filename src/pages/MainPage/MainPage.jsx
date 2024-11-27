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


const MainPage = ({
  isStatModalVisible,
  onDamageModalShow,
  handleAlertModalShow,
}) => {
  const state = store.getState();
  const season = useSelector((state) => state?.season?.isActive);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const isHintActive = useSelector(state => state.tutorial.isHintVisible)
  const dispatch = useDispatch()
  const main_background = require("./assets/main_background.png");

  const handleButtonClick = () => {
    isStatModalVisible ? onDamageModalShow() : WebApp.close();
  };
  
  useEffect(() => {
    const isTutorialDone = JSON.parse(localStorage.getItem('isTutorialDone')) || false;    
    !isTutorialDone && dispatch(actionSetTutorialActive(true))
  }, [])

  useEffect(() => {
    isHintActive.toMainButton && dispatch(actionHintButtonVisible(false, false))
  }, [])
  useEffect(() => {
    const img = new Image();
    img.src = main_background;
    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = () => setIsLoading(false);
  }, [main_background]);
  console.log(state);
  
  useEffect(() => {
    if (!season) {
      navigate(PagesLinks.SEASON_URL);
    }
  }, [season]);

  return (
    <div>
      <div className={styles.main_page}>
        {!isLoading && (
          <img
            className={styles.main_page_image}
            src={main_background}
            alt="main_back"
          />
        )}
        {state.bot.autoBots[0].currentLevel > 0 && (
          <AutoBot handleAlertModalShow={handleAlertModalShow} />
        )}
        <Stats onDamageModalShow={onDamageModalShow} />
        <Balance />
        {Object.keys(state.shop).length !== 0 && <TreeModule state={state} />}
        {isStatModalVisible && <BackButton onClick={handleButtonClick} />}
      </div>
    </div>
  );
};

export default MainPage;