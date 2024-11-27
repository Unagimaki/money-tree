import { BoostsTitle } from './BoostsTitle/BoostsTitle'
import { BoostItem } from './BoostItem/BoostItem'
import styles from './boostsContainer.module.scss'
import { useSelector } from 'react-redux'

export const BoostsContainer = ({ handleAlertModalShow, handleCloseAlert }) => {
  const boosts = useSelector((state) => state.boosts.boosts);
  const token = useSelector((state) => state.user.token);
  const bot = useSelector((state) => state.bot.autoBots[0]);
  const currentBotLevel = useSelector(
    (state) => state.bot.autoBots[0].currentLevel
  );

  return (
    <div className={styles.improve_container}>
      <BoostsTitle title="Улучшения" />
      <div className={styles.improve_container_wrapper}>
        <div className={styles.improve_container_wrapper_arrow}></div>
        <div className={styles.improve_container_wrapper_inner}>
          {boosts.map((item, index) => {
            return (
              <BoostItem
                currentLevel={item.currentLevel}
                title={item.boost.title}
                type={item.boost.type}
                level={item.boost.levels[item.currentLevel]?.upgrade}
                price={item.boost.levels[item.currentLevel]?.price}
                boostId={item.boost?.id}
                boostLevelId={item.boost.levels[item.currentLevel]?.id}
                token={token}
                key={index}
                handleAlertModalShow={handleAlertModalShow}
                handleCloseAlert={handleCloseAlert}
              />
            );
          })}
          <BoostItem
            currentLevel={currentBotLevel}
            type={"AUTOBOT"}
            level={bot.levels[currentBotLevel]?.power}
            price={bot.levels[currentBotLevel]?.price}
            boostLevelId={bot.levels[currentBotLevel]?.id}
            boostId={bot.id}
            token={token}
            title={bot.title}
            handleAlertModalShow={handleAlertModalShow}
            handleCloseAlert={handleCloseAlert}
          />
        </div>
      </div>
    </div>
  );
};