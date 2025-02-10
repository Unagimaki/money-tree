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
import { WebApp } from '../../../../App'
import { BackButton } from '@vkruglikov/react-telegram-web-app'

export const AdvertModal = () => {
    const logo = require('../../assets/winline_rect.png')
    const orange = require('../../assets/orange.png')
    const close = require('../../assets/close_btn.png')
    const dispatch = useDispatch()

    const MADE_A_BET_STATUS = 'MADE_A_BET_STATUS'
    const NOT_BIND_STATUS = 'NOT_BIND_STATUS'
    const BIND_STATUS = 'BIND_STATUS'

    const defaultData = {
        chance: [
            { place: '1', prize: '4 млрд.' },
            { place: '2', prize: '2 млрд.' },
            { place: '3', prize: '1 млрд.' },
            { place: '4', prize: '500 млн.' },
            { place: '5', prize: '200 млн.' },
            { place: '6-100', prize: '10 млн.' },
            { place: '101-500', prize: '2 млн.' },
            { place: '501-1000', prize: '1 млн.' },
            { place: '1001+', prize: '200 тыс.' }
        ]
    }

    const [isHiding, setIsHiding] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [status, setStatus] = useState(NOT_BIND_STATUS)
    const [currentRules, setRules] = useState(rules.option1)
    const [data, setData] = useState(defaultData)

    const initData = isDevelopment ? example.initData : window.Telegram.WebApp.initData

    const handleHideAdvertModal = () => {
        setIsHiding(true)
        setTimeout(() => { dispatch(actionHideAdvertModal()) }, 500)
    }

    useEffect(() => {
        if (status === BIND_STATUS) {
            setRules(rules.option2)
        } else if (status === MADE_A_BET_STATUS) {
            setRules(rules.option3)
        }
    }, [status])

    useEffect(() => {
        checkStatus(initData)
        .then((res) => {            
            if (res.data.is_bind) {
                setStatus(BIND_STATUS)
                checkBet(initData)
                .then(res => {
                    if (res.data.count > 0) setStatus(MADE_A_BET_STATUS)
                    setData(res.data)
                    }
                )
            }
        })
        .catch(e => console.log(e))
        .finally(() => setTimeout(() => setIsLoading(false), 1000))
    }, [])

    const linkAccount = () => {
        setIsLoading(true)
        createWlUrl(initData)
        .then((res) => WebApp.openLink(res.data))
        .finally(() => setTimeout(() => setIsLoading(false), 1000))
    }

    return(
        <div className={`${styles.container} ${isHiding ? styles.hide : ''}`}>
            <img className={styles.container_orange} src={orange} alt="orange"/>
            <div className={styles.container_inner}>
                <img className={styles.container_inner_logo} src={logo} alt="logo"/>
                <div className={styles.container_inner_info}>
                    <AdvertReward data={data}/>
                    <AdvertRools status={status} rules={currentRules}/>
                    <button style={{opacity: status === NOT_BIND_STATUS ? 1 : 0.6}} onClick={linkAccount} disabled={status !== NOT_BIND_STATUS} className={styles.container_inner_button}>
                        {isLoading ? (
                            <div className={styles.container_inner_button_loader}/>
                        ) : (
                            status === NOT_BIND_STATUS ? 'Привязать аккаунт' : 'Аккаунт привязан'
                        )}
                    </button>
                </div>
                <button onClick={handleHideAdvertModal} className={styles.container_inner_close}>
                    <img src={close} alt="close" />
                </button>
            </div>
            <BackButton onClick={handleHideAdvertModal} />
        </div>
    )
}