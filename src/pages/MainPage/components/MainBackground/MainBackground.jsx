import styles from './mainBackground.module.scss'

export const MainBackground = ({img, isLoading}) => {
    if (isLoading) return 
    return(
        <img className={styles.main_page_image} src={img} alt="main_back"/>
    )
}