import styles from './statItemListType.module.scss'

export const StatItemListType = ({isLoading, handleChangeListType, currentListType}) => {
    return(
        <div className={styles.container}>
            <div style={{opacity: isLoading ? 0.6 : 1}} className={styles.container_inner}>
                <div style={{left: currentListType === 'all' ? '0%' : '50%'}} className={styles.container_inner_background}/>
                <button onClick={() => !isLoading && handleChangeListType('all')} className={styles.container_inner_all_button}>
                    Общий
                </button>
                <button onClick={() => !isLoading && handleChangeListType('friends')} className={styles.container_inner_friends_button}>
                    Друзья
                </button>
            </div>
        </div>
    )
}