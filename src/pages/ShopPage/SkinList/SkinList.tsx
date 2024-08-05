import { SkinContainer } from './SkinContainer/SkinContainer'
import styles from './skinList.module.scss'

export const SkinList = () => {
    return(
        <div className={styles.skin_list}>
            <SkinContainer/>
            <SkinContainer/>
        </div>
    )
}