import styles from './statModal.module.scss'

export const StatModal = ({type, onDamageModalShow}) => {   
    const bundles = require('../../assets/energy_icon.png')
    const energy = require('../../assets/energy.png')
    const close = require('../../assets/close.png')
    
    return(
        <div className={styles.container}>
            <div className={styles.container_wrapper}>
                <button className={styles.container_wrapper_close_button} onClick={onDamageModalShow}>
                    <img src={close} alt="close"/>
                </button>
                <div className={styles.container_wrapper_image}>
                    <img src={type === 'energy' ? energy : bundles} alt="bundles" />
                </div>
                <div className={styles.container_wrapper_title}>{type === 'energy' ? 'Энергия' : 'Пучки'}</div>
                <div className={styles.container_wrapper_text}>{type === 'energy' ? 'Энергия нужна, чтобы собирать лифы в игре. Тратится при сборе и обновляется каждую секунду.' : 'Количество лифов за тап'}</div>
                <button onClick={onDamageModalShow} className={styles.container_wrapper_button}>
                    Закрыть
                </button>
            </div>
        </div>
    )
}