import { useEffect, useState } from 'react'
import { WebApp } from '../../../../App'
import styles from './InviteButtons.module.scss'
import { useSelector } from 'react-redux'
import { invite_img } from '../../offersImages'

export const InviteButtons = () => {
    const [isСopied, setsСopied] = useState(false)
    const [refLink, setRefLink] = useState('')
    const tgID = useSelector(state => state.user.player.tgId)

    const copy_img = require('../../assets/copy_icon.png')
    const copied_img = require('../../assets/copied.png')

    const botLink = `https://t.me/moneytree_game_bot?start=ref_${tgID}`

    useEffect(() => {
        setRefLink(`https://t.me/share/url?url=${encodeURIComponent(botLink)}&text=${encodeURIComponent('\nПривет! 🤚🏻 Играю в Money Tree и моментально обмениваю лифы на доллары по честному курсу \n🤑 По моей ссылке ты получишь 100 000 лифов в подарок! \n🍃 Попробуй!')}`)
    }, [])

    const copyInviteLink = async () => {
        setsСopied(true)
        await navigator.clipboard.writeText(botLink).then(res => console.log(res))
    }

    return(
        <div className={styles.container}>
            <button onClick={() => WebApp.openTelegramLink(refLink)} className={styles.container_invite_button}>
                <div className={styles.container_invite_button_icon}>
                    <img src={invite_img.url} alt="invite_img" />
                </div>
                <div className={styles.container_invite_button_text}>Пригласить</div>
            </button>
            <button onClick={copyInviteLink} className={styles.container_copy_button}>
                <img src={!isСopied ? copy_img : copied_img} alt="copy_img" />
            </button>
        </div>
    )
}