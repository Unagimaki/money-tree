import { useEffect, useState } from 'react';
import styles from './background.module.scss'

export const Background = () => {
    const [isLoading, setIsLoading] = useState(true)
    const background = require('../../assets/background.png')
    useEffect(() => {
        const img = new Image()
        img.src = background
        img.onload = () => { setIsLoading(false) } 
        img.onerror = () => setIsLoading(false)
    }, [background]);
    return(
        <div className={styles.container}>
            {
                !isLoading && <img className={styles.container_img} src={background} alt="background" />
            }
        </div>
    )
}