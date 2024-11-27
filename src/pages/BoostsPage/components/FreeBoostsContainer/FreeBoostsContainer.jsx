import { useSelector } from 'react-redux'
import { BoostsTitle } from '../BoostsContainer/BoostsTitle/BoostsTitle'
import { FreeBoostItem } from './FreeBoostItem/FreeBoostItem'
import styles from './freeBoostsContainer.module.scss'

export const FreeBoostsContainer = ({
  handleAlertModalShow, 
  handleFreeBoostModalShow,
}) => {
  const boosts = useSelector((state) => state.freeBoosts.freeBoosts);

  return (
    <div className={styles.boosts_container}>
      <BoostsTitle title="Бесплатные бустеры" />
      {boosts &&
        boosts.map((item, index) => {
          return (
            <FreeBoostItem
              handleAlertModalShow={handleAlertModalShow}
              handleFreeBoostModalShow={handleFreeBoostModalShow}
              title={item.title}
              type={item.boostType}
              key={index}
              id={item.id}
            />
          );
        })}
    </div>
  );
};