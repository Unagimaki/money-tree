import styles from './introModalThird.module.scss'

export const IntroModalThird = ({handleIntroModalVisible}) => {
    const close_icon = require('../../assets/close_icon.png')
    const orange = require('../../assets/orange.png')
    const leaf_back = require('../../assets/leaf_back.png')
    const intro = require('../../assets/intro_third.png')

    const handleCloseIntro = () => {
        handleIntroModalVisible()
    }

    return (
        <div className={styles.container}>
            <button onClick={handleCloseIntro} className={styles.container_close_button}>
                <img src={close_icon} alt="close_icon" />
            </button>
            <img className={styles.container_orange} src={orange} alt="orange" />
            <img className={styles.container_orange} src={leaf_back} alt="leaf_back" />
            <div className={styles.container_wrapper}>
                <img src={intro} alt="intro" />
                <div className={styles.container_wrapper_title}>
                    Жирные призы всем 
                </div>
                <div className={styles.container_wrapper_text}>
                    🚀 Раздаем 10 000 000 000 лифов – <br/> гарантированные подарки каждому!
                    <br/>
                    <div  className={styles.container_wrapper_text_list}>
                        Привяжи аккаунт Winline к Гонке <br/> ставок и участвуй в розыгрыше <br/> ценных призов!
                    </div>
                </div>
                <button onClick={() => {}} className={styles.container_wrapper_button}>К заданию</button>
            </div>
        </div>
    )
}