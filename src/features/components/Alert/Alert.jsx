import { useDispatch, useSelector } from 'react-redux';
import styles from './alert.module.scss';
import { actionHideModal } from '../../../state/reducers/alertModalReducer/alertModalReducer';
import { useEffect, useState } from 'react';

export const Alert = () => {
  const money_icon = require("./assets/money_icon.png");
  const dispatch = useDispatch();

  const isVisible = useSelector(state => state.alert.isVisible);
  const text = useSelector(state => state.alert.text);
  const title = useSelector(state => state.alert.title);

  const [isExiting, setIsExiting] = useState(false); // Состояние для отслеживания выхода компонента

  const handleCloseAlert = () => {
    setIsExiting(true); // Запускаем анимацию исчезновения
    setTimeout(() => {
      dispatch(actionHideModal()); // Прячем компонент после окончания анимации
    }, 500); // Время анимации (должно совпадать с длительностью анимации в SCSS)
  };

  useEffect(() => {
    if (isVisible) {
      setIsExiting(false); // Когда компонент снова видим, сбрасываем состояние

      // Запускаем таймер, чтобы компонент сам скрылся через 3 секунды
      const timer = setTimeout(() => {
        handleCloseAlert();
      }, 3000); // Таймер на 3 секунды

      // Очищаем таймер, если компонент снова стал невидимым
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible && !isExiting) return null; // Компонент исчезает только после завершения анимации

  // Класс с анимацией исчезновения, если компонент не видим
  const containerClass = isExiting ? `${styles.container} ${styles.container_hide}` : styles.container;

  return (
    <div style={{display: !isVisible && !isExiting && 'none'}} className={containerClass}>
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
