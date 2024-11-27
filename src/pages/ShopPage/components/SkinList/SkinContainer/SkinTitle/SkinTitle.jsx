import styles from './skinTitle.module.scss'

export const SkinTitle = ({title}) => {
    return(
        <div className={styles.skin_title}>
            {title}
        </div>
    )
}