import { useLocation, useNavigate } from 'react-router-dom'
import styles from './FooterMenuButton.module.scss'
import { useSelector } from 'react-redux';
import useCheckTime from '../../../hooks/useCheckTime';

const FooterMenuButton = ({text, to, img, left}) => {
  const navigate = useNavigate();
  const currentUrl = useLocation().pathname;
  const currentStep = useSelector((state) => state.tutorial.currentStep)
  const isTutorialActive = useSelector((state) => state.tutorial.isTutorialIsActive)
  const { isUpdated } = useCheckTime();

  
  const calcIndex = () => {
    return (currentStep === 6 && text === "Бусты") ||
    (currentStep === 7 && text === "Скины") ||
    (currentStep === 8 && text === "Стата") ||
    (currentStep === 9 && text === "Бонусы") && isTutorialActive ? 99 : 5;
  }

  return (
    <button
      style={{ left: left, zIndex: calcIndex() }}
      onClick={() => !isTutorialActive && navigate(to)}
      className={styles.button}
    >
      {
        text === 'Бонусы' && isUpdated && <div className={styles.button_checked}/>
      }
      <img className={styles.button_img} src={img} alt={text} />
      <div
        style={{ color: `${currentUrl === to ? "#8CDB4E" : "#fff"}` }}
        className={styles.button_text}
      >
        {text}
      </div>
    </button>
  );
}

export default FooterMenuButton