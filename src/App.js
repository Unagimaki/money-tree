import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { PagesLinks } from './shared/PagesLinks';
import BoostsPage from './pages/BoostsPage/BoostsPage';
import GamePage from './pages/GamePage/GamePage';
import ShopPage from './pages/ShopPage/ShopPage';
import StatPage from './pages/StatsPage/StatPage';
import MainPage from './pages/MainPage/MainPage';
import LoaderPage from './pages/LoaderPage/LoaderPage';
import styles from './App.module.scss'
import { StatButton } from './pages/StatsPage/components/StatButton/StatButton';
import { useDispatch, useSelector } from 'react-redux';
import { OfferModal } from './pages/OffersPage/components/OfferModal/OfferModal';
import { FooterMenu } from './features/components/FooterMenu/FooterMenu';
import { WithdrawalModal } from './pages/StatsPage/components/WithdrawalModal/WithdrawalModal';
import { useEffect, useRef, useState } from 'react';
import { store } from './state';
import { actionIncreaseUserBalance, actionIncreaseUserEnergy } from './state/reducers/userReducer/actions';
import { StatModal } from './features/modals/StatModal/StatModal';
import { FreeBoostModal } from './features/modals/FreeBoostModal/FreeBoostModal';
import { SeasonEnd } from './pages/MainPage/components/SeasonEnd/SeasonEnd';
import { io } from "socket.io-client";
import { actionAddRef } from './state/reducers/referralsReducer/actions';
import { Alert } from './features/components/Alert/Alert';
import { Tutorial } from './features/components/Tutorial/Tutorial';
import { TwaAnalyticsProvider } from "@tonsolutions/telemetree-react";
import OffersPage from './pages/OffersPage/OffersPage';

export const WebApp = window.Telegram.WebApp
// export const baseURL = process.env.REACT_APP_BASE_URL
export const baseURL = 'moneytree-stage.extensi.one'

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const [isStatModalVisible, setIsStatModalVisible] = useState({
    isVisible: false,
    type: "",
  });
  const [isFreeBoostModalVisible, setIsFreeBoostModalVisible] = useState({
    isVisible: false,
    type: "",
    id: "",
  });
  const [isAlertModalVisible, setIsAlertModalVisible] = useState({
    isVisible: false,
    type: "",
    text: "",
    title: "",
  });
  const state = store.getState();
  const token = state.user.token;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socketRef = useRef(null);
  const currentUrl = useLocation().pathname;
  const isWalletModalVisible = useSelector((state) => state.wallet.isVisible);
  const offerModalVisible = useSelector((state) => state.offers.isVisible);
  const isTutorialActive = useSelector(
    (state) => state.tutorial.isTutorialIsActive
  );
  const regeneration = useSelector(
    (state) => state?.user?.player?.regeneration
  );

  const maxEnergy = useSelector((state) => state?.user?.player?.maxEnergy);
  const energy = useSelector((state) => state?.user?.player?.energy);
  const SOCKET_URL = `wss://${baseURL}/notification`;
  
  useEffect(() => {
    if (socketRef.current || !token) return;

    socketRef.current = io(SOCKET_URL, {
      auth: { token: token },
      withCredentials: true,
      transports: ["websocket"],
    });
    socketRef.current.on("error", (error) =>
      console.log("Received error", error)
    );
    socketRef.current.on("disconnect", (reason) =>
      console.log("Disconnected - reason:", reason)
    );
    socketRef.current.on("connect_error", (error) => console.log(error));
    socketRef.current.on("newReferral", (data) => {
      console.log(data.message);
      dispatch(actionIncreaseUserBalance(100000));
      dispatch(actionAddRef(1));
    });
    socketRef.current.on("seasonEnd", (data) => {
      console.log(data.message);
      navigate(PagesLinks.SEASON_URL);
    });
    const handleBeforeUnload = () =>
      socketRef.current && socketRef.current.close();
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      socketRef.current && socketRef.current.close();
      socketRef.current = null;
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [token]);

  const timeoutRef = useRef(null); // Используем useRef для хранения идентификатора таймера

  const handleAlertModalShow = (title, text, type) => {
    // Если уведомление уже видно, скрываем его
    if (isAlertModalVisible.isVisible) {
      setIsAlertModalVisible({ ...isAlertModalVisible, isVisible: false });
    }

    // Устанавливаем новое состояние уведомления
    setIsAlertModalVisible({
      title,
      text,
      type,
      isVisible: true,
    });

    // Очищаем предыдущий таймер, если он существует
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Устанавливаем новый таймер
    timeoutRef.current = setTimeout(() => {
      setIsAlertModalVisible((prevState) => ({
        ...prevState,
        isVisible: false,
      }));
    }, 3000);
  };
  const handleCloseAlert = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Очищаем таймер при закрытии
    }
    setIsAlertModalVisible((prevState) => ({
      ...prevState,
      isVisible: false,
    }));
  };
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  const handleDamageStatModalShow = (type) => {
    if (currentUrl === PagesLinks.GAME_URL) return;
    setIsStatModalVisible({
      ...isStatModalVisible,
      isVisible: !isStatModalVisible.isVisible,
      type,
    });
  };
  const handleFreeBoostModalShow = (id = "", type = "") => {
    setIsFreeBoostModalVisible({
      ...isFreeBoostModalVisible,
      isVisible: !isFreeBoostModalVisible.isVisible,
      type,
      id,
    });
  };

  let timerId = null;
  let currentEnergy = energy;

  useEffect(() => {
    if (currentUrl === PagesLinks.GAME_URL) return clearInterval(timerId);
    if (currentEnergy < maxEnergy) {
      timerId = setInterval(() => {
        const energyToAdd = Math.min(regeneration, maxEnergy - currentEnergy);
        if (energyToAdd > 0) {
          dispatch(actionIncreaseUserEnergy(energyToAdd));
        }
        if (currentEnergy + energyToAdd >= maxEnergy) {
          clearInterval(timerId);
        }
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [regeneration, currentEnergy, maxEnergy, currentUrl]);

  useEffect(() => {
    if (currentUrl !== PagesLinks.ANALYTICS && Object.keys(state.user).length === 0) {
      navigate(PagesLinks.LOADING_URL);
    }
    setIsLoaded(true);
  }, []);

  // useEffect(() => {
    
  //   const handleVisibilityChange = () => window.location.reload() // тут вместо релоада обновить объект юзера player/me
    
    
  //   document.addEventListener('visibilitychange', handleVisibilityChange)
  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange)
  //   }
  // }, [])

  if (!isLoaded) return null;

  return (
    <TwaAnalyticsProvider projectId="59a2dcea-5236-4c30-888c-93c99eea7a19" apiKey="fb8e3102-1c0c-4751-8b14-6f687520c638" appName="Money tree">
      <div className={styles.app}>
        {isTutorialActive && <Tutorial />}
        <Routes>
          <Route path={PagesLinks.BOOSTS_URL} element={<BoostsPage
            handleCloseAlert={handleCloseAlert}
            handleAlertModalShow={handleAlertModalShow}
            isFreeBoostModalVisible={isFreeBoostModalVisible.isVisible}
            handleFreeBoostModalShow={handleFreeBoostModalShow}
            navigate={navigate}
            state={state}
          />}
          />
          <Route
            path={PagesLinks.GAME_URL}
            element={
              <GamePage
                handleAlertModalShow={handleAlertModalShow}
                onDamageModalShow={handleDamageStatModalShow}
                navigate={navigate}
                state={state}
              />
            }
          />
          <Route path={PagesLinks.SHOP_URL} element={
              <ShopPage
                handleAlertModalShow={handleAlertModalShow}
                navigate={navigate}
                state={state}
              />
            }
          />
          <Route
            path={PagesLinks.STATS_URL}
            element={
              <StatPage
                handleAlertModalShow={handleAlertModalShow}
                navigate={navigate}
                state={state}
              />
            }
          />
          <Route
            path={PagesLinks.BONUS_URL}
            element={
              <OffersPage
                handleAlertModalShow={handleAlertModalShow}
                navigate={navigate}
                state={state}
              />
            }
          />
          <Route
            path={PagesLinks.MAIN_URL}
            element={
              <MainPage
                handleAlertModalShow={handleAlertModalShow}
                isStatModalVisible={isStatModalVisible.isVisible}
                onDamageModalShow={handleDamageStatModalShow}
                state={state}
              />
            }
          />
          <Route
            path={PagesLinks.LOADING_URL}
            element={<LoaderPage navigate={navigate} />}
          />
          <Route path={PagesLinks.SEASON_URL} element={<SeasonEnd />} />
          <Route path="/" element={<LoaderPage />} />
        </Routes>

        {isAlertModalVisible.isVisible && (
          <Alert
            handleCloseAlert={handleCloseAlert}
            handleAlertModalShow={handleAlertModalShow}
            title={isAlertModalVisible.title}
            text={isAlertModalVisible.text}
            type={isAlertModalVisible.type}
          />
        )}
        {currentUrl !== "/" && currentUrl !== PagesLinks.LOADING_URL && currentUrl !== PagesLinks.SEASON_URL && <FooterMenu />}
        {(currentUrl === PagesLinks.STATS_URL || currentUrl === PagesLinks.SEASON_URL) && <StatButton />}
        {offerModalVisible && ( <OfferModal handleAlertModalShow={handleAlertModalShow} /> )}
        {isStatModalVisible.isVisible && ( <StatModal onDamageModalShow={handleDamageStatModalShow} type={isStatModalVisible.type} /> )}
        {isWalletModalVisible && ( <WithdrawalModal handleAlertModalShow={handleAlertModalShow} /> )}
        {isFreeBoostModalVisible.isVisible && ( <FreeBoostModal handleAlertModalShow={handleAlertModalShow} id={isFreeBoostModalVisible.id} type={isFreeBoostModalVisible.type} handleFreeBoostModalShow={handleFreeBoostModalShow} /> )}
      </div>
    </TwaAnalyticsProvider>
  );
}

export default App;
