import { useSelector } from 'react-redux'
import styles from './Balance.module.scss'
import { formatNumber } from '../../../helpers/formatNumber'

export const Balance = ({top}) => {    
    const img  = require('./assets/money_icon.png')
    const balance = useSelector(state => state.user.player.balance)
    const currentStep = useSelector((state) => state.tutorial.currentStep);
    const zIndex = currentStep === 1 ? 98 : 93
    return (
      <div style={{ top: top, zIndex: zIndex }} className={styles.balance}>
        <img className={styles.balance_img} src={img} alt="money_icon" />
        <div className={styles.balance_text}>
          {formatNumber(balance) || balance}
        </div>
      </div>
    );
}