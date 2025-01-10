import styles from './introModal.module.scss'


export const IntroModal = ({handleIntroModalVisible}) => {
    const intro = require('../../assets/intro.png')
    const close_icon = require('../../assets/close_icon.png')

    const handleCloseIntro = () => {
        handleIntroModalVisible()
    }

    return(
        <div className={styles.container}>
            <button onClick={handleCloseIntro} className={styles.container_close_button}>
                <img src={close_icon} alt="close_icon" />
            </button>
            <div className={styles.container_wrapper}>
                <img src={intro} alt="intro" />
                <div className={styles.container_wrapper_title}>
                    Не имей 100 USDT, <br/>
                    а имей 100 друзей
                </div>
                <div className={styles.container_wrapper_text}>
                    Приводи друзей и получай 20% <br/>
                    прибыли с их фарма <br/>
                    (учитывается как фарм с игры, <br/>
                    так и с выполненных заданий) 
                </div>
                <button className={styles.container_wrapper_button}>Пригласить друга</button>
            </div>
        </div>
    )
}