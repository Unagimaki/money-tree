import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Wheel } from 'react-custom-roulette'
import styles from './wheelContainer.module.scss'
import { SpinButton } from '../SpinButton/SpinButton'
import { BetSelector } from '../BetSelector/BetSelector'
import { speenWheel } from '../../services/spinWheel'
import { actionSetUserBalance, actionSetUserTickets } from '../../../../state/reducers/userReducer/actions'
import { actionSetCurrentPrize, actionSetModalVisible } from '../../../../state/reducers/wheelReducer/wheelReducer'
import { actionShowModal } from '../../../../state/reducers/alertModalReducer/alertModalReducer'

const money_icon = require('../../assets/money_icon.png')
const sponsor = require('../../assets/1win.png')
const refresh_circle = require('../../assets/refresh-circle.png')
const ticket_icon = require('../../assets/ticket_icon.png')

export const WheelContainer = ({ prizes }) => {
	const [isSpeeningNow, setIsSpeeningNow] = useState(false)
	const [mustSpin, setMustSpin] = useState(false)
	const [prizeIndex, setPrizeIndex] = useState(0)
	const [isAutoSpin, setIsAutoSpin] = useState(false)
	const [speenDuration, setSpeenDuration] = useState(0.5)

	const [timer, setTimer] = useState(5500)
	const token = useSelector(state => state.user.token)
	const dispatch = useDispatch()
	const [tickets, setTickets] = useState(1)
	const userTicketsBalace = useSelector(state => state.user.player.tickets)
	const AUTO_SPIN_PAUSE = 1000 // 1 секунда между прокрутками

	const handleDataChange = (newData) => {
		setTickets(newData) // Обновляем состояние родителя
	}

	const data = prizes?.map((item) => ({
		option: item.prizeType === 'LEAFS' ? `${item.value} лифов` :
			item.prizeType === 'TICKETS' ? `${item.value} билета` :
				item.prizeType === 'SPONSOR' ? 'спонсор' :
					item.prizeType === 'RESPIN' ? 'респин' : '',
		image: item.prizeType !== 'LEAFS' && item.prizeType !== 'TICKETS' ? {
			uri: item.prizeType === 'SPONSOR' ? sponsor :
				item.prizeType === 'RESPIN' ? refresh_circle : '',
			sizeMultiplier: 0.7,
			offsetX: 0,
			offsetY: 100
		} : null
	}))


	const handleSpeen = () => {
		if (tickets > userTicketsBalace) {
			dispatch(actionShowModal('Не хватает билетов'))
			return
		}

		if (userTicketsBalace <= 0) {
			dispatch(actionShowModal('Нет билетов для прокрутки'))
			return
		}

		if (tickets > 50) {
			dispatch(actionShowModal('Максимальная сумма прокрутки 50 билетов'))
			return
		}

		if (isSpeeningNow) return

		setIsSpeeningNow(true)
		dispatch(actionSetUserTickets(userTicketsBalace - tickets))
		speenWheel(token, tickets)
			.then(response => {
				const { prizeType, value } = response.data.selectedPrize

				// Определяем, что использовать в поиске
			const searchValue = prizeType === 'LEAFS' ? `${value} лифов` :
				prizeType === 'TICKETS' ? `${value} билета` :
					prizeType === 'SPONSOR' ? 'спонсор' :
						prizeType === 'RESPIN' ? 'респин' :
							`${prizeType} - ${value}`;
			
			// Поиск нужного элемента
			const index = data.findIndex(item => item.option === searchValue);

			if (index === -1) {
				// Обрабатываем ошибку, если элемент не найден
				console.error(`Prize not found: ${searchValue}`);
				console.log(data);
				
				// Можно добавить дополнительную логику для обработки, например:
				// - показ модалки с ошибкой
				// - вернуть значение по умолчанию
				// - выполнить другие действия
			} else {
				// Если элемент найден, продолжаем выполнение кода
				setPrizeIndex(index);
			}


				setMustSpin(true)
				setTimeout(() => {
					
					// Обновление баланса и билетов происходит всегда
					dispatch(actionSetUserBalance(response.data.totalBalance))
					dispatch(actionSetUserTickets(response.data.totalTickets))
				}, timer)

			})
			.catch(e => {
				console.log(e)
				dispatch(actionShowModal('Произошла ошибка'))
			})
			.finally(() => {
				setIsSpeeningNow(false)
			})
	}

	useEffect(() => {
		if (isAutoSpin) {
			setTimer(1100)
			const interval = setInterval(() => {
				if (!isSpeeningNow) {
					console.log('Автоспин: запускаем колесо')
					handleSpeen()
				}
			}, 1500)

			// Очистка интервала
			return () => {
				clearInterval(interval)
				console.log('Автоспин выключен, очищаем интервал')
			}
		} else {
			setTimer(5500)
		}
	}, [isAutoSpin, isSpeeningNow])

	const onHoldComplete = () => {
		console.log('Удерживание 2 сек');	
		setSpeenDuration(0.1)
		setIsAutoSpin(true)
		handleSpeen()
	}
	const onHoldDone = () => {
		console.log('Удерживание завершено');	
		setIsAutoSpin(false)	
		setSpeenDuration(0.5)
		handleSpeen()
	}

	const handleStopSpeen = () => {
		setMustSpin(false)
		setIsSpeeningNow(false)
	}

	return (
		<div className={styles.container}>
			<div className={styles.container_inner}>
				<Wheel
					mustStartSpinning={mustSpin}
					prizeNumber={prizeIndex}
					data={data}
					backgroundColors={Array(prizes.length).fill('#2F4422')}
					outerBorderColor='#8CDB4E'
					outerBorderWidth={1}
					innerRadius={5}
					radiusLineWidth={1.3}
					fontSize={18}
					onStopSpinning={handleStopSpeen}
					spinDuration={speenDuration}
					textColors={['#fff']}
				/>

				<BetSelector isSpeeningNow={isSpeeningNow} onDataChange={handleDataChange} />
				<SpinButton onHoldDone={onHoldDone} onHoldComplete={onHoldComplete} mustSpin={mustSpin} isSpeeningNow={isSpeeningNow} />
			</div>
		</div>
	)
}
