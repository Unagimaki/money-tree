import { useSelector } from 'react-redux'
import styles from './introModal.module.scss'
import { WebApp } from '../../../App'
import { useEffect, useState } from 'react'


export const IntroModal = ({handleIntroModalVisible}) => {
    const intro = require('../../assets/intro.png')
    const close_icon = require('../../assets/close_icon.png')
    const [refLink, setRefLink] = useState('')
    
    const tgID = useSelector(state => state.user.player.tgId)
    const botLink = `https://t.me/moneytree_game_bot?start=ref_${tgID}`
    
    const handleCloseIntro = () => {
        handleIntroModalVisible()
    }

    useEffect(() => {
        setRefLink(`https://t.me/share/url?url=${encodeURIComponent(botLink)}&text=${encodeURIComponent('\nПривет! 🤚🏻 Играю в Money Tree и моментально обмениваю лифы на доллары по честному курсу \n🤑 По моей ссылке ты получишь 100 000 лифов в подарок! \n🍃 Попробуй!')}`)
    }, [])

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
                    Приводи друзей <br/>
                    и получай 20% прибыли <br/>
                    с выполненных ими заданий 
                </div>
                <button onClick={() => WebApp.openTelegramLink(refLink)} className={styles.container_wrapper_button}>Пригласить друга</button>
            </div>
        </div>
    )
}
