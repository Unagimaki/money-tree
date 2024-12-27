import { useSelector } from 'react-redux'
import styles from './skinContainer.module.scss'
import { SkinItem } from './SkinItem/SkinItem'
import { SkinTitle } from './SkinTitle/SkinTitle'

export const SkinContainer = ({ obj, handleAlertModalShow }) => {
  const playerReferralsCount = useSelector((state) => state.referrals.playerReferralsCount || 0)
  const token = useSelector((state) => state.user.token);
  const title = obj.shopItem.title;
  const balance = useSelector((state) => state.user.player.balance);

  return (
    <div className={styles.skin_container}>
      <SkinTitle title={title} />
      <div className={styles.skin_container_inner}>
        <div className={styles.skin_container_inner_wrapper}>
          {obj.shopItem.itemType !== "AUTOBOT" && (
            <div className={styles.skin_container_inner_wrapper_arrow} />
          )}
          {obj.shopItem.shopItemLevels.map((shopItemLevel, index) => {
            return (
              <SkinItem
                previousItemLevel={obj.shopItem.shopItemLevels[index - 1]}
                currentLevel={obj.currentLevel}
                shopItemLevel={shopItemLevel.level}
                price={shopItemLevel.price}
                title={obj.shopItem.title}
                upgrade={shopItemLevel.upgrade}
                referralRequiredAmount={shopItemLevel.referralRequiredAmount}
                playerReferralsCount={playerReferralsCount}
                shopItemLevelId={shopItemLevel.id}
                token={token}
                shopItemId={obj.shopItem.id}
                userBalance={balance}
                fileId={shopItemLevel.media.fileId}
                type={obj.shopItem.itemType}
                handleAlertModalShow={handleAlertModalShow}
                key={shopItemLevel.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};