import { Balance } from '../../features/components/Balance/Balance';
import { store } from '../../state';
import { BackButton } from '@vkruglikov/react-telegram-web-app'
import styles from './shopPage.module.scss'
import { FriendsCountContainer } from './components/FriendsCountContainer/FriendsCountContainer';
import { SkinList } from './components/SkinList/SkinList';

const ShopPage = ({ navigate, handleAlertModalShow }) => {
  const state = store.getState();
  const handleBackButtonClick = () => {
    navigate("/main");
  };

  return (
    <div className={styles.shop_page}>
      <Balance top={"min(11.73vw, 43.99px)"} />
      <FriendsCountContainer
        referralsCount={state.referrals.playerReferralsCount}
      />
      <SkinList handleAlertModalShow={handleAlertModalShow} shop={state.shop} />
      <BackButton onClick={handleBackButtonClick} />
    </div>
  );
};

export default ShopPage