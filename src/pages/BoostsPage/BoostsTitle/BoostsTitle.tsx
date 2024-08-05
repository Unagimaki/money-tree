import { FC } from "react"
import styles from './boostsTitle.module.scss'
interface props {
    title: string
}

export const BoostsTitle: FC<props> = ({title}) => {
    return(
        <div className={styles.title}>
            {title}
        </div>
    )
}