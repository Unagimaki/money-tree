import { useDispatch } from 'react-redux'
import styles from './advert.module.scss'
import { actionShowAdvertModal } from '../../../../state/reducers/advertModalReducer/advertModalReducer'

export const Advert = () => {
    const advert_img = require('../../assets/advert.png')
    const dispatch = useDispatch()
    const handleShowModal = () => {
        dispatch(actionShowAdvertModal())
    }

    return(
        <div onClick={handleShowModal} className={styles.container}>
            <div className={styles.container_inner}>
                <img className={styles.container_inner_img} src={advert_img} alt='advert_img'/>
                <div className={styles.container_inner_title}>ГОНКА СТАВОК</div>
                <div className={styles.container_inner_subtitle}>ГАРАНТИРОВАННЫЕ ПРИЗЫ</div>
                <div className={styles.container_inner_text}>ЖМИ И УЧАСТВУЙ</div>
            </div>
        </div>
    )
}