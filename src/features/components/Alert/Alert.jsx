import { useDispatch, useSelector } from 'react-redux';
import styles from './alert.module.scss';
import { actionHideModal } from '../../../state/reducers/alertModalReducer/alertModalReducer';

export const Alert = () => {
  const money_icon = require("./assets/money_icon.png");
  const dispatch = useDispatch();

  const isVisible = useSelector(state => state.alert.isVisible);
  const text = useSelector(state => state.alert.text);
  const title = useSelector(state => state.alert.title);

  const handleCloseAlert = () => {
    dispatch(actionHideModal())
  }

  if (!isVisible) return null; 


  return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
        <img className={styles.container_inner_icon} src={money_icon} alt="money_icon"/>
        <div className={styles.container_inner_text}>
          <div className={styles.container_inner_text_title}>{title}</div>
          <div className={styles.container_inner_text_subtitle}>{text}</div>
        </div>
        <button onClick={handleCloseAlert} className={styles.container_inner_button}>
          ОК
        </button>
      </div>
    </div>
  );
};
