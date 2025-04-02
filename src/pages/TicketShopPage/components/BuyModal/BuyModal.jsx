import styles from './buyModal.module.scss'

export const BuyModal = ({showModal, tickets}) => {
    const ticket_icon = require('../../assets/ticket_icon.png')
    return(
        <div className={styles.container}>
            <div className={styles.container_dark}/>
            <div className={styles.container_inner}>
                <div className={styles.container_inner_title}>Успешно</div>
                <div className={styles.container_inner_amount}>
                    <div className={styles.container_inner_amount_text}>+{tickets}</div>
                    <img src={ticket_icon} alt="ticket_icon" />
                </div>
                <button onClick={() => showModal()} className={styles.container_inner_button}>Закрыть</button>
            </div>
        </div>
    )
}