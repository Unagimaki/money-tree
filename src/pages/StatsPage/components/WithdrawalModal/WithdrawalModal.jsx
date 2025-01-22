import { useDispatch, useSelector } from 'react-redux'
import styles from './withdrawalModal.module.scss'
import { actionSetConnectModalVisible, actionSetUserWallet, actionSetUserWalletAddress } from '../../../../state/reducers/walletReducer/actions'
import { useTonConnectModal, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'
import { useCallback, useEffect, useState } from 'react'
import { formatString } from '../../helpers/formatString'
import { saveUserWallet } from '../../services/saveUserWallet'
import { removeUserWallet } from '../../services/removeUserWallet'
import { withdrawalUserWallet } from '../../services/withdrawalUserWallet'
import { actionSetUserBalance } from '../../../../state/reducers/userReducer/actions'
import { WithdrawalBalance } from '../WithdrawalBalance/WithdrawalBalance'
import { UNLIMITED, WEEK_LIMIT } from '../../../../utils/config'
import { formatNumber } from '../../../../helpers/formatNumber'
import { withdrawalResponse } from '../../helpers/withdrawalResponse'
import { WithDrawalModalInfo } from '../WithDrawalInfo/WithDrawalModalInfo'
import { getData } from '../../../../services/getData'
import { actionShowModal } from '../../../../state/reducers/alertModalReducer/alertModalReducer'

export const WithdrawalModal = () => {
  const dispatch = useDispatch();

  const wallet = require("../../assets/wallet.png");
  const close = require("../../assets/close.png");
  const close_wallet_button = require("../../assets/close_button.png");
  const wallet_icon = require("../../assets/wallet_icon.png");
  const copy_icon = require("../../assets/copy_icon.png");
  const tether_icon = require("../../assets/tether.png");

  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState(null);
  const [isWithdrawalProceed, setIsWithdrawalProceed] = useState(false)
  const token = useSelector((state) => state.user.token);
  const balance = useSelector((state) => state.user.player.balance);
  const currentCourse = useSelector(state => state?.season?.course)
  const usdtBalance = balance * currentCourse
  const daysLeft = useSelector(state => state.wallet?.userWallet?.daysLeft || null)
  const address = useSelector(state => state.wallet.userWallet.address?.address)

  const getCurrentWithdrawalSum = () => {
    if (usdtBalance >= WEEK_LIMIT && usdtBalance < UNLIMITED) {
      return WEEK_LIMIT / currentCourse
    } else if (usdtBalance < WEEK_LIMIT) {
      console.log(`Текущего баланса не хватает для недельного вывода`)
    } else {
      console.log(`Текущего баланса хватает для безлимитного вывода будет выведено ${formatNumber(balance)} лифов`)
      return balance
    }
  }

  const currentAccount = tonConnectUI.account;
  const currentWalletInfo = tonConnectUI.walletInfo;
  const currentIsConnectedStatus = tonConnectUI.connected;
  const walletTon = useTonWallet();
  const { state, open, closeModal } = useTonConnectModal();
   
  useEffect(() => { setTonWalletAddress(currentAccount?.address) }, [
    currentIsConnectedStatus,
    currentWalletInfo,
    tonConnectUI.onModalStateChange,
    walletTon,
    state,
    open,
    closeModal,
  ]);

  useEffect(() => {
    if (tonWalletAddress && !address) {
      dispatch(actionSetUserWalletAddress(tonWalletAddress));
      saveUserWallet(token, tonWalletAddress)
        .then(() => { dispatch(actionShowModal('Кошелек подключен!')) })
        .catch((e) => console.log(e));
    }
  }, [tonConnectUI, tonWalletAddress, tonConnectUI.onModalStateChange]);

  const handleWalletConnection = useCallback((address) => {
    if (!address) return
    address && setTonWalletAddress(address);
  }, []);
  const handleWalletDisconnection = useCallback((address) => {
    setTonWalletAddress(null);
  }, []);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address) {
        handleWalletConnection(tonConnectUI.account?.address);
      } else {
        handleWalletDisconnection();
      }
    };

    checkWalletConnection();

    const unsubscribe = tonConnectUI.onModalStateChange((wallet) => {
      if (wallet) { handleWalletConnection(wallet?.account?.address) }
      else { handleWalletDisconnection() }
    })

    return () => { unsubscribe()};
  }, [
    tonConnectUI,
    handleWalletConnection,
    handleWalletDisconnection,
    tonConnectUI.onModalStateChange,
  ]);

  const handleWalletAction = async () => {
    if (tonConnectUI.connected) {
      await tonConnectUI.disconnect();
    } else {
      await tonConnectUI.openModal();
    }
  };

  const handleDisconnectWallet = async () => {
    await tonConnectUI.disconnect();
    dispatch(actionShowModal('Кошелек отключен'))
    dispatch(actionSetUserWalletAddress(null));
    setTonWalletAddress(null);
    removeUserWallet(token, tonWalletAddress)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const handleWithdrawal = () => {
    if (daysLeft > 0) {
      dispatch(actionShowModal('Лимит исчерпан'))
      return
    }
    if (isWithdrawalProceed) return
    setIsWithdrawalProceed(true)
    
    // запрос для вывода
    withdrawalUserWallet(token, getCurrentWithdrawalSum())
      .then(() => {
        dispatch(actionShowModal('Задача успешно поставлена на вывод, ожидайте!'))

        // получение обновленных данных кошелька
        getData(token, 'wallet')
          .then((res) => {
            dispatch(actionSetUserWallet(res.data))
            dispatch(actionSetUserBalance(balance - getCurrentWithdrawalSum()));
          })
          
      })
      .catch(e => { dispatch(actionShowModal(withdrawalResponse(e.response.data.message))) })
      .finally(() => setIsWithdrawalProceed(false))
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_wrapper}>
        <button onClick={() => dispatch(actionSetConnectModalVisible(false))} className={styles.container_wrapper_close_button}>
          <img src={close} alt="close" />
        </button>
        <img className={styles.container_wrapper_wallet_img} src={wallet} alt="wallet"/>
        <div className={styles.container_wrapper_title}>
          {address ? ( "Ваш кошелек подключен" ) : ( <>Подключите свой <br /> кошелек</> )}
        </div>

        {
        address ? (
          <div className={styles.container_wrapper_wallet_panel}>
            <button onClick={handleDisconnectWallet} className={styles.container_wrapper_wallet_panel_remove_button}           >
              <img src={close_wallet_button} alt="close_wallet_button"/>
            </button>
            <div className={styles.container_wrapper_wallet_panel_info}>
              <div className={styles.container_wrapper_wallet_panel_info_adress}>
                <img className={ styles.container_wrapper_wallet_panel_info_adress_wallet_img } src={wallet_icon} alt="wallet_icon"/>
                <div className={ styles.container_wrapper_wallet_panel_info_adress_stroke }>
                  {formatString(address)}
                </div>
              </div>
              <img className={ styles.container_wrapper_wallet_panel_info_wallet_copy_button } src={copy_icon} alt="copy_icon" />
            </div>
          </div>
        ) : (
          <button onClick={handleWalletAction} className={styles.container_wrapper_button} >
            <div>Подключите кошелек</div>
            <img src={wallet} alt="wallet_icon" />
          </button>
        )
        }
        {
          address && 
          <button
            onClick={handleWithdrawal}
            className={styles.container_wrapper_button}
            style={{opacity: isWithdrawalProceed ? .5 : 1}}
            disabled={isWithdrawalProceed}
          >
            Вывод в USDT <img src={tether_icon} alt="tether_icon" />
          </button>
        }
        <WithdrawalBalance/>
        {
          address ?
          <WithDrawalModalInfo/> :

          <div className={styles.container_wrapper_text}>
            Подключите свой криптокошелек. Если у вас его нет, создайте его в{" "}
            <br /> своем аккаунте Telegram
          </div>
        }
        
      </div>
    </div>
  );
};