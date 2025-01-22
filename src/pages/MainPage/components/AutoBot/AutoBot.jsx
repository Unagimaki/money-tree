import styles from './autoBot.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { actionSetAutobotLastLaunchTime, actionSetAutobotLauchInfo, actionSetAutobotReadyToCollect, actionSetAutobotReadyToLaunch, actionSetAutobotStop } from '../../../../state/reducers/autobotReducer/action'
import { convertTimeToIso } from '../../helpers/convertTimeToIso'
import { convertMillisecondsToTime } from '../../helpers/convertMillisecondsToTime'
import { collectMoneyFromBot } from '../../services/collectMoneyFromBot'
import { autobotLaunch } from '../../services/autobotLaunch'
import { getData } from '../../../../services/getData'
import { actionIncreaseUserBalance } from '../../../../state/reducers/userReducer/actions'
import { actionShowModal } from '../../../../state/reducers/alertModalReducer/alertModalReducer'

export const AutoBot = ({ currentBotLevel }) => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isLoading, setIsLoading] = useState(true)
  const botSkinLevel = useSelector(state => state.shop).find(item => item?.shopItem?.itemType === 'AUTOBOT')?.currentLevel
  const isInitialValue = time.hours === 0 && time.minutes === 0 && time.seconds === 0;

  const dispatch = useDispatch();
  const lvl1 = require("../../assets/bot/autobot-snow.png");
  const lvl2 = require("../../assets/bot/lvl2.png");
  const dots = require("../../assets/bot/dots.png");
  const threeHours = 10800000;

  const bot = useSelector((state) => state.bot);
  const token = useSelector((state) => state.user.token);
  const lastLauch = useSelector((state) => state.bot.launch?.playerAutoBot?.lastShutdownTime);
  const botLevel = useSelector((state) => state.bot.autoBots[0].currentLevel);
  
  const charges = useSelector((state) => state.bot.launch?.playerAutoBot?.charges);
  const isActive = useSelector((state) => state.bot.launch?.playerAutoBot?.isActive);
  const canCollect = useSelector((state) => state.bot.launch?.playerAutoBot?.canCollect);
  
  const collectMoneyFromAutobot = () => {
    collectMoneyFromBot(token)
      .then((res) => {
        getData(token, "auto-bot/player").then((res) => {
          dispatch(actionSetAutobotLauchInfo(res.data));
        });
        dispatch(actionShowModal('Лифы собраны'))
        dispatch(actionIncreaseUserBalance(res.data.profit));
        dispatch(actionSetAutobotReadyToLaunch());
      })
      .catch((e) => {
        dispatch(actionShowModal('Ошибка'))
      });
  };

  const lauchAutobot = () => {
    autobotLaunch(token)
      .then(() => {
        getData(token, "auto-bot/player").then((res) => {
          dispatch(actionSetAutobotLauchInfo(res.data));
        });
      })
      .catch((e) => {
        console.log("Use autobot error: " + e);
      });
    const botLaunchTime = convertTimeToIso(new Date());
    dispatch(actionSetAutobotLastLaunchTime(botLaunchTime));
  };

  useEffect(() => {
    if (isActive) {
      const timer = setInterval(() => {
        const timeLeftMs = new Date(lastLauch).getTime() - new Date().getTime();
        if (timeLeftMs <= 0) {
          dispatch(actionSetAutobotStop());
          dispatch(actionSetAutobotReadyToCollect());
          setTime({ hours: 0, minutes: 0, seconds: 0 });
          clearTimeout(timer);
        } else if (timeLeftMs <= threeHours) {
          const { hours, minutes, seconds } = convertMillisecondsToTime(
            new Date(lastLauch).getTime() - new Date().getTime()
          );
          setTime({ hours, minutes, seconds });
        }
      }, 1000);
    }
  }, [isActive])

  if (!currentBotLevel || currentBotLevel <= 0 || bot.autoBots.length === 0) {
    return null;
  }

  return (
    <div className={styles.bot}>
      <img className={styles.bot_dots} src={dots} alt="dots" />
      {
        isLoading &&
        <button className={styles.bot_button}>
          <div className={styles.bot_button_loader}/>
        </button>

      }
      {(charges || botLevel) && !isActive && !canCollect && (
        <button onClick={lauchAutobot} className={styles.bot_button}>
          Фарм
        </button>
      )}
      {canCollect && (
        <button className={styles.bot_button} onClick={collectMoneyFromAutobot}>
          Собрать
        </button>
      )}
      {isActive && !isInitialValue && (
        <div className={styles.bot_timer}>
          <div>
            {`${time.hours.toString().padStart(2, "0")}:${time.minutes
              .toString()
              .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}
          </div>
        </div>
      )}
      {!isActive && !canCollect && charges === 0 && (
        <button className={styles.bot_button}>Приходи завтра</button>
      )}
      <img src={botSkinLevel === 2 ? lvl2 : lvl1} alt="bot" />
    </div>
  );
};
