import styles from './partnerWinItem.module.scss'

export const PartnerWinItem = ({ isUsed, link, value }) => {
	const one_win_logo = require('../../assets/1win_logo.png')

	const handleLink = () => {
		if (link && !isUsed) {
			window.open(link, '_blank') // открытие в новой вкладке
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.container_inner}>
				<div className={styles.container_inner_info}>
					<img src={one_win_logo} alt="one_win_logo" />
					<div className={styles.container_inner_text}>{value}</div>
				</div>

				<button
					className={styles.container_inner_button}
					onClick={handleLink}
					disabled={isUsed}
				>
					{isUsed ? 'Получен' : 'Открыть'}
				</button>
			</div>
		</div>
	)
}
