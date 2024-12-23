import { useEffect, useState } from "react";
import styles from "./loaderPage.module.scss";
import { useDispatch, } from "react-redux";
import { actionSetShopItems } from "../../state/reducers/shopReducer/actions";
import { actionSetSeason } from "../../state/reducers/seasonReducer/actions";
import { actionSetPlayersTop } from "../../state/reducers/statsReducer/actions";
import { actionSetRef } from "../../state/reducers/referralsReducer/actions";
import { actionSetFreeBoosts } from "../../state/reducers/freeBoostsReducer/action";
import { actionSetBoosts } from "../../state/reducers/boostsReducer/action";
import { actionSetOffers } from "../../state/reducers/offersReducer/actions";
import { actionSetAutobot, actionSetAutobotLauchInfo } from "../../state/reducers/autobotReducer/action";
import { useNavigate } from "react-router-dom";
import { actionSetUser, actionSetUserRefreshToken, actionSetUserToken } from "../../state/reducers/userReducer/actions";
import { fetchData } from "./service/fetchData";
import { PagesLinks } from "../../shared/PagesLinks";
import { UserLogin } from "../../services/userLogin";
import { actionSetUserWallet } from "../../state/reducers/walletReducer/actions";
import { example_query, isDevelopment } from "../../utils/config";
import { actionSetLeagues } from "../../state/reducers/leagueReducer/leagueReducer";
import { actionSetDailyBonus } from "../../state/reducers/dailyBonusReducer/dailyBonusReducer";

const LoaderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataFetched, setDataFetched] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const winlineImg = require('./assets/winline.png')
  const webApp_query = window.Telegram.WebApp.initData;
  const auth_data = isDevelopment ? example_query : webApp_query

  useEffect(() => {
    const img = new Image()
    img.src = winlineImg
    img.onload = () => {
      setIsLoading(false)
    } 
    img.onerror = () => setIsLoading(false)
  }, [winlineImg])
  
  useEffect(() => {
    window.Telegram.WebApp.expand()
    window.Telegram.WebApp.disableVerticalSwipes()

    const dispatchFunctions = [
      (data) => dispatch(actionSetAutobot(data)),
      (data) => dispatch(actionSetAutobotLauchInfo(data)),
      (data) => dispatch(actionSetFreeBoosts(data)),
      (data) => dispatch(actionSetSeason(data)),
      // (data) => dispatch(actionSetPlayersTop(data)),
      (data) => dispatch(actionSetRef(data)),
      (data) => dispatch(actionSetBoosts(data)),
      (data) => dispatch(actionSetShopItems(data)),
      (data) => dispatch(actionSetOffers(data)),
      (data) => dispatch(actionSetUserWallet(data)),
      (data) => dispatch(actionSetLeagues(data)),
      (data) => dispatch(actionSetDailyBonus(data)),
    ]    
    if (!dataFetched) {
      UserLogin(auth_data)
        .then((user) => {       
          dispatch(actionSetUserRefreshToken(user.refreshToken));
          dispatch(actionSetUser(user.player));
          dispatch(actionSetUserToken(user.accessToken));

          fetchData(user.accessToken)
            .then((results) => {
              results.forEach((result, index) => {
                if (result.status === "fulfilled") {                 
                  dispatchFunctions[index] ? dispatchFunctions[index](result.value.data) : console.log(`Нет dispatch функции`)                  
                } else {
                  console.log(`Ошибка при получении данных: ${result.reason.response.data.path}`);                  
                }
              });
              setTimeout(() => {
                setDataFetched(true);
                navigate(PagesLinks.MAIN_URL)
              }, isDevelopment ? 0 : 2000);
            })
            .catch((e) => console.log("fetchData error: " + e));
        })
        .catch((e) => console.log("User login error: " + e));
    }
  }, [])

  return (
    <div className={styles.loading}>
      {
        !isLoading &&
        <div className={styles.loading_wrapper}>
          <div className={styles.loading_wrapper_title}>MoneyTree</div>
          <div className={styles.loading_wrapper_loader}/>
          <img className={styles.loading_wrapper_image} src={winlineImg} alt="winlineImg" />
        </div>
      }
    </div>
  );
};

export default LoaderPage;
