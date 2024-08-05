import { Link } from 'react-router-dom'
import styles from './playButton.module.scss'
import { PagesLinksEnum } from '../../../shared/PagesLinks.enum'

export const PlayButton = () => {
    return(
        <Link to={PagesLinksEnum.LOADING_URL} className={styles.button}>
            <div>
                Play on your mobile
            </div>
        </Link>
    )
}