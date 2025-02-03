import { useDispatch } from 'react-redux'
import styles from './advertModal.module.scss'
import { AdvertReward } from './components/AdvertReward/AdvertReward'
import { AdvertRools } from './components/AdvertRools/AdvertRools'
import { actionHideAdvertModal } from '../../../../state/reducers/advertModalReducer/advertModalReducer'
import { useEffect, useState } from 'react'
import { example } from '../../../../services/userLogin'
import { checkStatus } from './service/checkStatus'
import { isDevelopment } from '../../../../utils/config'
import { checkBet } from './service/checkBet'
import { rules } from './service/data'
import { createWlUrl } from './service/createWlUrl'

export const AdvertModal = () => {
    const logo = require('../../assets/winline_rect.png')
    const orange = require('../../assets/orange.png')
    const close = require('../../assets/close_btn.png')
    const dispatch = useDispatch()

    const MADE_A_BET_STATUS = 'MADE_A_BET_STATUS'
    const NOT_BIND_STATUS = 'NOT_BIND_STATUS'
    const BIND_STATUS = 'BIND_STATUS'

    const [isHiding, setIsHiding] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [status, setStatus] = useState(NOT_BIND_STATUS)
    const [data, setData] = useState(rules.option1)

    const initData = isDevelopment ? example.initData : window.Telegram.WebApp.initData

    const handleHideAdvertModal = () => {
        setIsHiding(true)
        setTimeout(() => { dispatch(actionHideAdvertModal()) }, 1000)
    }

    useEffect(() => {
        if (status === BIND_STATUS) {
            setData(rules.option2)
        } else if (status === MADE_A_BET_STATUS) {
            setData(rules.option3)
        }
    }, [status])

    useEffect(() => {
        // проверка статуса
        checkStatus(initData)
        .then((res) => {
            if (res.data.is_bind) {
                setStatus(BIND_STATUS)
                // если привязан, проверяем, сделал ли ставку
                checkBet(initData)
                .then(res => {
                    if (res.data.count > 0) {
                        setStatus(MADE_A_BET_STATUS)
                    }
                })
            }
        })
        .catch(e => console.log(e))
        .finally(() => setIsLoading(false))
    }, [])

    const linkAccount = () => {
        setIsLoading(true)
        createWlUrl(initData)
        .then(() => {
            setStatus(BIND_STATUS)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    return(
        <div className={`${styles.container} ${isHiding ? styles.hide : ''}`}>
            <img className={styles.container_orange} src={orange} alt="orange"/>
            <div className={styles.container_inner}>
                <img className={styles.container_inner_logo} src={logo} alt="logo"/>
                <AdvertRools rules={data}/>
                <AdvertReward/>
                <button style={{opacity: isLoading || BIND_STATUS ? 0.6 : 1}} onClick={linkAccount} disabled={isLoading} className={styles.container_inner_button}>
                    {status === BIND_STATUS ? 'Аккаунт привязан' : 'Привязать аккаунт'}                    
                    </button>
                <button onClick={handleHideAdvertModal} className={styles.container_inner_close}>
                    <img src={close} alt="close" />
                </button>
            </div>
        </div>
    )
}