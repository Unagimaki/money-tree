import { useSelector } from 'react-redux'
import styles from './shopItemsContainer.module.scss'
import { ShopItem } from '../ShopItem/ShopItem'

export const ShopItemsContainer = ({ showModal, isModalVisible }) => {
	const shopItems = useSelector(state => state.ticketShop.items)
	const token = useSelector(state => state.user.token)
	console.log(shopItems)

	return (
		<div className={styles.container}>
			<div className={styles.container_inner}>
				{
					shopItems.sort((a, b) => a.tickets - b.tickets).map(item => {
						return <ShopItem
							key={item.id}
							id={item.id}
							price={item.price}
							tickets={item.tickets}
							token={token}
							showModal={showModal}
							isModalVisible={isModalVisible}
						/>
					})
				}
			</div>
		</div>
	)
}
