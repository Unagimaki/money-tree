import { Balance } from '../../features/components/Balance/Balance'
import styles from './boostsPage.module.scss'
import { BackButton } from '@vkruglikov/react-telegram-web-app'
import { BoostsContainer } from './components/BoostsContainer/BoostsContainer'
import { FreeBoostsContainer } from './components/FreeBoostsContainer/FreeBoostsContainer'

const BoostsPage = ({isFreeBoostModalVisible, navigate, handleFreeBoostModalShow }) => {

  const handleBackButtonClick = () => { isFreeBoostModalVisible ? handleFreeBoostModalShow() : navigate("/main") }
  
  return (
    <div className={styles.boosts_page}>
      <Balance top={"min(11.73vw, 44px"}/>
      <div className={styles.boosts_page_wrapper}>
        <FreeBoostsContainer handleFreeBoostModalShow={handleFreeBoostModalShow}/>
        <BoostsContainer/>
      </div>
      <BackButton onClick={handleBackButtonClick} />
    </div>
  );
};

export default BoostsPage