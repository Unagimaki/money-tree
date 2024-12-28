import { useDispatch, useSelector } from 'react-redux'
import styles from './withdrawalModal.module.scss'
import { actionSetConnectModalVisible, actionSetUserWallet } from '../../../../state/reducers/walletReducer/actions'
import { useTonConnectModal, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'
import { useCallback, useEffect, useState } from 'react'
import { formatString } from '../../helpers/formatString'
import { saveUserWallet } from '../../services/saveUserWallet'
import { removeUserWallet } from '../../services/removeUserWallet'
import { withdrawalUserWallet } from '../../services/withdrawalUserWallet'
import { actionSetUserBalance } from '../../../../state/reducers/userReducer/actions'
import { WithdrawalBalance } from '../WithdrawalBalance/WithdrawalBalance'

export const WithdrawalModal = ({ handleAlertModalShow }) => {
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
    if (tonWalletAddress) {
      dispatch(actionSetUserWallet(tonWalletAddress));
      saveUserWallet(token, tonWalletAddress)
        .then(() => { handleAlertModalShow('Кошелек подключен') })
        .catch((e) => console.log(e));
    }
  }, [tonConnectUI, tonWalletAddress, tonConnectUI.onModalStateChange]);

  const handleWalletConnection = useCallback((address) => {
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
      if (wallet) {
        handleWalletConnection(wallet?.account?.address);
      } else {
        handleWalletDisconnection();
      }
    });

    return () => {
      unsubscribe();
    };
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
    handleAlertModalShow("Кошелек отключен");
    dispatch(actionSetUserWallet(null));
    setTonWalletAddress(null);
    removeUserWallet(token, tonWalletAddress)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const withdrawalResponse = (res) => {
    switch (res) {
      case "Withdrawal amount exceeds threshold, verification is required. Please wait for approval.":
        return "Транзакцию надо верифицировать"
      case 'Sum of withdrawal must be greater than 0':
        return 'Сумма вывода 0'
      case 'Player balance is not enough':
        return 'Баланс игрока меньше указанного'
      case 'Withdrawal amount is below minimum allowed':
        return "Вывод при конвертации меньше указанного в сезоне"
      case 'Player wallet address not found':
        return 'Кошелек не найден'
      case 'Withdraw not allowed yet!':
        return 'Вывод средств закрыт в сезоне'
      case 'Funds were successfully withdrawn':
        return "Успешно"
      default:
        return res;
    }
  }
  const handleWithdrawal = () => {
    if (isWithdrawalProceed) return
    setIsWithdrawalProceed(true)
    console.log('Отправка');
    
    withdrawalUserWallet(token, balance)
      .then((res) => {
        handleAlertModalShow("Задача успешно поставлена на вывод, ожидайте!");
        dispatch(actionSetUserBalance(0));
      })
      .catch(e => {      
        handleAlertModalShow(
          withdrawalResponse(e.response.data.message),
          "",
          "warning"
        );
      })
      .finally(() => {
        setIsWithdrawalProceed(false)
      })
      
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_wrapper}>
        <button onClick={() => dispatch(actionSetConnectModalVisible(false))} className={styles.container_wrapper_close_button}>
          <img src={close} alt="close" />
        </button>
        <img
          className={styles.container_wrapper_wallet_img}
          src={wallet}
          alt="wallet"
        />
        <div className={styles.container_wrapper_title}>
          {tonWalletAddress ? ( "Ваш кошелек подключен" ) : ( <>Подключите свой <br /> кошелек</> )}
        </div>
        {tonWalletAddress ? (
          <div className={styles.container_wrapper_wallet_panel}>
            <button onClick={handleDisconnectWallet} className={styles.container_wrapper_wallet_panel_remove_button}           >
              <img src={close_wallet_button} alt="close_wallet_button"/>
            </button>
            <div className={styles.container_wrapper_wallet_panel_info}>
              <div className={styles.container_wrapper_wallet_panel_info_adress}>
                <img className={ styles.container_wrapper_wallet_panel_info_adress_wallet_img } src={wallet_icon} alt="wallet_icon"/>
                <div className={ styles.container_wrapper_wallet_panel_info_adress_stroke }>
                  {formatString(tonWalletAddress)}
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
        )}
        {tonWalletAddress && (
          <button
            onClick={handleWithdrawal}
            className={styles.container_wrapper_button}
            style={{opacity: isWithdrawalProceed ? .5 : 1}}
            disabled={isWithdrawalProceed}
          >
            Вывод в USDT <img src={tether_icon} alt="tether_icon" />
          </button>
        )}
        <WithdrawalBalance/>
        {tonWalletAddress ? (
          <div className={styles.container_wrapper_withdrawal}>
            <div className={styles.container_wrapper_withdrawal_title}>
              Информация по выводу
            </div>
            <ul className={styles.container_wrapper_withdrawal_list}>
              <li className={styles.container_wrapper_withdrawal_list_item}>
                1. Минимальная сумма вывода в любой момент $15
              </li>
              <li className={styles.container_wrapper_withdrawal_list_item}>
                2. Минимальная сумма вывода после завершения сезона (примерно начало 2025) от $1
              </li>
              <li className={styles.container_wrapper_withdrawal_list_item}>
                3. Комиссию за вывод средств (10%) оплачивает игрок, то есть на баланс придет сумма с вычетом комиссии  
              </li>
              <li className={styles.container_wrapper_withdrawal_list_item}>
                4. Обычно вывод происходит в течение 60 минут, в редких случаях может потребоваться до 72 часов на модерацию
              </li>
            </ul>
          </div>
        ) : (
          <div className={styles.container_wrapper_text}>
            Подключите свой криптокошелек. Если у вас его нет, создайте его в{" "}
            <br /> своем аккаунте Telegram
          </div>
        )}
        {/* {!tonWalletAddress && (
          <button className={styles.container_wrapper_button}>Проверить</button>
        )} */}
        
      </div>
    </div>
  );
};