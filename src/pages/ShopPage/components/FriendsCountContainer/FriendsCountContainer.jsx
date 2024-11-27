import styles from './friendsCountContainer.module.scss'

export const FriendsCountContainer = ({referralsCount}) => {
    return(
        <div className={styles.friends_container}>
            <div className={styles.friends_container_text}>
                Ты пригласил <br/>
                <span>{referralsCount} друзей</span>
            </div>
        </div>
    )
}