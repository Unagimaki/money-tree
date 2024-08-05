import { useEffect, useState } from 'react'
import { BalanceModule } from '../../modules/BalanceModule/BalanceModule'
import { BoostModal } from './BoostModal/BoostModal'
import { BoostsContainer } from './BoostsContainer/BoostsContainer'
import styles from './boostsPage.module.scss'
import { ImproveContainer } from './ImproveContainer/ImproveContainer'

export const BoostsPage = () => {
    const [boostModalIsVisible, setBoostModalIsVisible] = useState<boolean>(false)
    const [visible, setVisible] = useState(false);
    const handleModal = () => {
        setBoostModalIsVisible(!boostModalIsVisible)
    }

    useEffect(() => {
      setVisible(true);
    }, []);

    return(
        <div
            className={`${styles.boosts_page} ${visible? styles['boosts_page-enter-active'] : styles['boosts_page-leave']}`}
        >
            <BalanceModule top='5.42%'/>
            <BoostsContainer handleModal={handleModal}/>
            <ImproveContainer/>
            <BoostModal handleModal={handleModal} boostModalIsVisible={boostModalIsVisible}/>
        </div>
    )
}