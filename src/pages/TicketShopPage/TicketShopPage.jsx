import { useEffect, useState } from 'react'
import { BackButton } from './components/BackButton/BackButton'
import { Balance } from './components/Balance/Balance'
import { BuyModal } from './components/BuyModal/BuyModal'
import { ShopItemsContainer } from './components/ShopItemsContainer/ShopItemsContainer'
import { TicketBalance } from './components/TicketBalance/TicketBalance'
import styles from './ticketShopPage.module.scss'

export const TicketShopPage = ({navigate}) => {

    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => {
        setIsModalVisible(true)
    }

    useEffect(() => {
        isModalVisible && setTimeout(() => setIsModalVisible(false), 2000) 
    }, [isModalVisible])

    const handleBackButtonClick = ({navigate}) => {
        navigate("/main");
    }

    return(
        <div className={styles.container}>
            <Balance/>
            <TicketBalance/>
            <ShopItemsContainer showModal={showModal} isModalVisible={isModalVisible}/>
            {
                isModalVisible && <BuyModal showModal={() => setIsModalVisible(false)}/>
            }
            
            <BackButton onClick={handleBackButtonClick}/>
        </div>
    )
}