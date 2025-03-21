import { UNLIMITED, WEEK_LIMIT } from '../../../../utils/config'
import styles from './withDrawalModalInfo.module.scss'

export const WithDrawalModalInfo = () => {
  return(
    <div className={styles.container_wrapper_withdrawal}>
      <div className={styles.container_wrapper_withdrawal_title}>
        Информация по выводу
      </div>
      <ul className={styles.container_wrapper_withdrawal_list}>
        <li className={styles.container_wrapper_withdrawal_list_item}>
          1. Каждую неделю можно выводить ${UNLIMITED} и более <br/> (без ограничений), либо ${WEEK_LIMIT}
        </li>
        <li className={styles.container_wrapper_withdrawal_list_item}>
          2. Комиссию за вывод средств (10%) оплачивает игрок, то есть на баланс придет сумма с вычетом комиссии  
        </li>
        <li className={styles.container_wrapper_withdrawal_list_item}>
          3. Обычно вывод происходит в течение 60 минут, в редких случаях может потребоваться до 72 часов на модерацию
        </li>
      </ul>
    </div>
  )
}