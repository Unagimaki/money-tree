import { useDispatch, useSelector } from 'react-redux'
import styles from './modal.module.scss'
import { useState } from 'react'
import { actionSetModalVisible } from '../../../../state/reducers/mainModalReducer/action'
import { useNavigate } from 'react-router-dom'

export const Modal = () => {
    const [containerClass, setContainerClass] = useState(styles.container)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const type = useSelector(state => state.modal.type)

    const handleClickClose = () => {
        setContainerClass(styles.container_hide);
        setTimeout(() => dispatch(actionSetModalVisible(false)), 500)
        setTimeout(() => setContainerClass(styles.container), 500)
    }
    const bundles = require('../../assets/bundles.png')
    const energy = require('../../assets/energy.png')
    const close = require('../../assets/close.png')

    const setCurrentContent = () => ({
        img: type === 'energy' ? energy : bundles,
        title: type === 'energy' ? 'Энергия' : 'Пучки',
        text: type === 'energy' ? 'Описание характеристики энергии' : 'Описание характеристик пучков'
    })

    return(
        <div className={containerClass}>
            <div className={styles.container_wrapper}>
                <button className={styles.container_wrapper_close_button} onClick={handleClickClose}>
                    <img src={close} alt="close"/>
                </button>
                <div className={styles.image}>
                    <img src={setCurrentContent().img} alt="" />
                </div>
                <div className={styles.title}>{setCurrentContent().title}</div>
                <div className={styles.text}>{setCurrentContent().text}</div>

                <button onClick={navigate('/main')} className={styles.container_wrapper_button}>
                    Главная
                </button>
            </div>
        </div>
    )
}