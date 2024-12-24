import styles from './statItemListType.module.scss'

export const StatItemListType = ({handleChangeListType, currentListType}) => {
    return(
        <div className={styles.container}>
            <div className={styles.container_inner}>
                <button
                    style={currentListType === 'all' ? { backgroundColor: '#8CDB4E', color: '#000' } : {}}
                    onClick={() => handleChangeListType('all')} className={styles.container_inner_all}
                >
                    Общий
                </button>
                <button
                    style={currentListType === 'friends' ? { backgroundColor: '#8CDB4E', color: '#000' } : {}}
                    onClick={() => handleChangeListType('friends')}
                    className={styles.container_inner_friends}
                >
                    Друзья
                </button>
            </div>
        </div>
    )
}