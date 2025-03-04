import { useDispatch, useSelector } from 'react-redux'
import styles from './taskItem.module.scss'
import { actionSetOfferInfo, actionSetOfferModalVisible, actionSetOfferReward } from '../../../../../state/reducers/offersReducer/actions'
import { formatNumber } from '../../../../../helpers/formatNumber'
import { done_img } from '../../../offersImages'
import { baseURL } from '../../../../../App'

export const TaskItem = ({
  isCompleted,
  reward,
  title,
  id,
  imgUrl,
  count,
  isNew
}) => {
  const arrow_img = require("../../../assets/arrow.png");
  const money = require("../../../assets/money.png");
  const course = useSelector((state) => state.season?.course);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(actionSetOfferInfo(id));
    dispatch(actionSetOfferModalVisible(true));
    dispatch(actionSetOfferReward(reward));
  };

  if (count === 0) return

  return (
    <div onClick={handleClick} className={styles.container}>
      <div className={styles.container_image}>
        <img
          src={`https://${baseURL}/directus/assets/${imgUrl}`}
          alt="container_image"
        />
      </div>
      <div className={styles.container_info}>
        <div className={styles.container_info_title}>{title}</div>
        <div className={styles.container_info_reward}>
          <img src={money} alt="money" />
          <div>+ {isNew && 'до '}{formatNumber(reward)}</div>
          <div className={styles.container_info_reward_money}>
            &nbsp; ({(course * reward).toFixed(5).replace(/\.?0+$/, "")} $)
          </div>
        </div>
      </div>
      <div className={styles.container_done}>
        <img src={isCompleted ? done_img.url : arrow_img} alt="img" />
      </div>
    </div>
  );
};