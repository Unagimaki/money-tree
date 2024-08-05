import { FC } from 'react'
import styles from './boostItem.module.scss'

interface props {
    title: string
    text: string
    imgUrl: string
    handleModal?: () => void
}

export const BoostItem: FC<props> = ({title, text, imgUrl, handleModal}) => {
    return(
        <div onClick={handleModal} className={styles.boost_item}>
            <div className={styles.boost_item_img_container}>
                <img src={imgUrl} alt="img" />
            </div>
            <div className={styles.boost_item_info}>
                <div className={styles.boost_item_info_title}>{title}</div>
                <div className={styles.boost_item_info_text}>{text}</div>
            </div>

        </div>
    )
}