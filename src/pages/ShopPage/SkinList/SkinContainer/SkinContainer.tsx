import styles from './skinContainer.module.scss'
import { SkinItem } from './SkinItem/SkinItem'
import { SkinItemBlocked } from './SkinItemBlocked/SkinItemBlocked'
import { SkinTitle } from './SkinTitle/SkinTitle'

export const SkinContainer = () => {
    return(
        <div className={styles.skin_container}>
            <SkinTitle title='Наименование скина'/>
            <div className={styles.skin_container_wrapper}>
                <SkinItem/>
                <SkinItemBlocked/>
            </div>
        </div>
    )
}