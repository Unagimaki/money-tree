import { useSelector } from 'react-redux'
import { SkinContainer } from './SkinContainer/SkinContainer'
import styles from './skinList.module.scss'

export const SkinList = ({ handleAlertModalShow }) => {
  const shop = useSelector((state) => state.shop);

  return (
    <div className={styles.skin_list}>
      <div className={styles.skin_list_wrapper}>
        {shop.map((item) => {
          return (
            <SkinContainer
              handleAlertModalShow={handleAlertModalShow}
              key={item.shopItem.id}
              obj={item}
            />
          );
        })}
      </div>
    </div>
  );
};