import { FC } from 'react'
import styles from './skinTitle.module.scss'

interface props {
    title: string
}

export const SkinTitle: FC<props> = ({title}) => {
    return(
        <div className={styles.skin_title}>
            {title}
        </div>
    )
}