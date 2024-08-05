import styles from './logo.module.scss'

export const Logo = () => {
    const logo = require('../assets/logo.png')
    return(
        <div className={styles.logo}>
            <img className={styles.logo_img} src={logo} alt="logo" />
        </div>
    )
}