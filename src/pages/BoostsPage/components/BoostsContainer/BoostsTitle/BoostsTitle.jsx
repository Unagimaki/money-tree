import styles from './boostsTitle.module.scss'

export const BoostsTitle = ({title}) => {
    return(
        <div className={styles.title}>
            {title}
        </div>
    )
}