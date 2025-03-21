import { useNavigate } from 'react-router-dom'
import styles from './backButton.module.scss'
import { PagesLinks } from '../../../../shared/PagesLinks'

export const BackButton = () => {
    const navigate = useNavigate()


    return(
        <div className={styles.container}>
            <button onClick={() => navigate(PagesLinks.WHEEL_URL)} className={styles.container_inner}>
                Назад
            </button>
        </div>
    )
}