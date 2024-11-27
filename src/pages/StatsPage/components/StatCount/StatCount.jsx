import { useSelector } from 'react-redux'
import styles from './statCount.module.scss'
import { formatNumber } from '../../../../helpers/formatNumber'

export const StatCount = () => {
    const money_icon = require('../../assets/money_icon.png')
    const balance = useSelector(state => state.user?.player?.balance)
    const currentCourse = useSelector(state => state?.season?.course)

    const currentSum = balance * currentCourse
    
    return (
      <div className={styles.count}>
        <div className={styles.count_first}>
          <div className={styles.count_first_text}>{formatNumber(balance)}</div>
          <img
            className={styles.count_first_img}
            src={money_icon}
            alt="money_icon"
          />
        </div>
        <div>\</div>
        <div className={styles.count_first}>
          <div className={styles.count_first_text}>{currentSum.toFixed(3)}</div>
          <div className={styles.count_first_icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="46"
              fill="none"
              viewBox="0 0 40 40"
            >
              <rect width="40" height="40" fill="#28C281" rx="20"></rect>
              <path
                fill="#fff"
                d="M20.014 32.05c-.739 0-1.217-.464-1.217-1.243v-1.381c-2.899-.342-4.908-1.832-5.496-3.733a2.2 2.2 0 0 1-.137-.752c0-.86.588-1.435 1.531-1.435.793 0 1.245.465 1.532 1.107.546 1.395 1.832 2.16 3.91 2.16 2.2 0 3.61-.875 3.61-2.501 0-1.381-1.259-2.092-3.35-2.584l-1.86-.438c-3.117-.71-5.181-2.488-5.181-5.072 0-3.09 2.378-4.95 5.44-5.332V9.45c0-.78.48-1.244 1.218-1.244s1.217.465 1.217 1.244v1.395c2.68.328 4.62 1.777 5.222 3.787.069.26.123.506.123.765 0 .793-.601 1.272-1.476 1.272-.793 0-1.217-.383-1.559-1.04-.615-1.435-1.682-2.132-3.514-2.132-2.091 0-3.35.93-3.35 2.393 0 1.257 1.231 2.037 3.05 2.447l1.777.41c3.514.807 5.51 2.516 5.51 5.195 0 3.364-2.68 5.168-5.783 5.51v1.354c0 .779-.479 1.244-1.217 1.244"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    );
}