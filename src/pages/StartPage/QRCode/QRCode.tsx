import styles from './qRCode.module.scss'

export const QRCode = () => {
    const code = require('../assets/qr.png')
    return(
        <div className={styles.code}>
            <img src={code} alt="code" />
        </div>
    )
}