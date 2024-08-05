import { Link } from 'react-router-dom'
import styles from './moduleStatsItem.module.scss'
import { FC } from 'react'

interface props {
    img: string
    text: string
}

export const ModuleStatsItem: FC<props> = ({img, text}) => {
    return(
        <Link className={styles.item} to={'/boosts'}>
            <img className={styles.item_img} src={img} alt="icon" />
            <div className={styles.item_count}>
                {text}
            </div>
        </Link>
    )
}