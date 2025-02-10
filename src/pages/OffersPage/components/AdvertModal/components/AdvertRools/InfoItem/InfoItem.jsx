import styles from './infoItem.module.scss'

export const InfoItem = ({text, img}) => {
    return (
        <div className={styles.container}>
            <img src={img} alt="img" />
            <div className={styles.container_text}>{text}</div>
        </div>
    )
}