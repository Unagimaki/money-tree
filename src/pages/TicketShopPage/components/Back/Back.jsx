import { useNavigate } from 'react-router-dom'
import styles from './back.module.scss'
import { PagesLinks } from '../../../../shared/PagesLinks'

export const Back = () => {
    const navigate = useNavigate()


    return(
        <div className={styles.container}>
            <button onClick={() => navigate(PagesLinks.WHEEL_URL)} className={styles.container_inner}>
                Назад
            </button>
        </div>
    )
}