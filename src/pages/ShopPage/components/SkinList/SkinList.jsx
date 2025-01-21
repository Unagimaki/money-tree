import { useSelector } from 'react-redux'
import { SkinContainer } from './SkinContainer/SkinContainer'
import styles from './skinList.module.scss'

export const SkinList = () => {
  const shop = useSelector((state) => state.shop);

  return (
    <div className={styles.skin_list}>
      <div className={styles.skin_list_wrapper}>
        {shop.map((item) => {
          return (
            <SkinContainer
              key={item.shopItem.id}
              obj={item}
            />
          );
        })}
      </div>
    </div>
  );
};