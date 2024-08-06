import { useEffect } from 'react'
import styles from './loaderPage.module.scss'
import { PagesLinksEnum } from '../../shared/PagesLinks.enum';

export const LoaderPage = () => {
    const loading = require('./assets/loading.png')

    useEffect(() => {
        setTimeout(() => {
            window.location.assign(PagesLinksEnum.MAIN_URL);
        }, 1000)
    }, [])
    
    return(
        <div className={styles.loading}>
            <img src={loading} alt="loading" />
        </div>
    )
}