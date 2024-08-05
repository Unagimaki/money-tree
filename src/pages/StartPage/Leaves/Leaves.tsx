import styles from './Leaves.module.scss'

export const Leaves = () => {
    const leaves = require('../assets/leaves.png')
    return(
        <div className={styles.leaves}>
            <img src={leaves} alt="leaves"/>
        </div>
    )
}