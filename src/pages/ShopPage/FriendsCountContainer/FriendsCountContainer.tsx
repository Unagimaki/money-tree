import styles from './friendsCountContainer.module.scss'

export const FriendsCountContainer = () => {
    return(
        <div className={styles.friends_container}>
            <div className={styles.friends_container_text}>
                Ты пригласил <br/>
                <span>100 друзей</span>
            </div>
        </div>
    )
}