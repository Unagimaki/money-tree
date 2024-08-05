import { Leaves } from './Leaves/Leaves'
import { Logo } from './Logo/Logo'
import { PlayButton } from './PlayButton/PlayButton'
import { QRCode } from './QRCode/QRCode'
import styles from './startPage.module.scss'

export const StartPage = () => {
    return(
        <div className={styles.start}>
            <Logo/>
            <QRCode/>
            <PlayButton/>
            <Leaves/>
        </div>  
    )
}