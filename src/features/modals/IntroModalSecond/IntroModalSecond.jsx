import { useNavigate } from 'react-router-dom'
import styles from './introModalSecond.module.scss'
import { PagesLinks } from '../../../shared/PagesLinks'

export const IntroModalSecond = ({handleIntroModalVisible}) => {
    const close_icon = require('../../assets/close_icon.png')
    const orange = require('../../assets/orange.png')
    const intro = require('../../assets/intro_second.png')
    const navigate = useNavigate();

    const handleCloseIntro = () => {
        handleIntroModalVisible()
    }

    return (
        <div className={styles.container}>
            <button onClick={handleCloseIntro} className={styles.container_close_button}>
                <img src={close_icon} alt="close_icon" />
            </button>
            <img className={styles.container_orange} src={orange} alt="orange" />
            <div className={styles.container_wrapper}>
                <img src={intro} alt="intro" />
                <div className={styles.container_wrapper_title}>
                    🚀 5000₽ за 30 минут 
                </div>
                <div className={styles.container_wrapper_text}>
                    Выполняй задание "Винлайн делает <br/> разницу" и получи:
                    <br/>
                    <div  className={styles.container_wrapper_text_list}>
                        <li>2500₽ от Money Tree</li>
                        <li>3000₽ фрибетами от Winline</li>
                    </div>
                </div>
                <button onClick={() => {navigate(PagesLinks.BONUS_URL)}} className={styles.container_wrapper_button}>К заданию</button>
            </div>
        </div>
    )
}