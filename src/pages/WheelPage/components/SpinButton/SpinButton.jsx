import React, { useRef, useState, useEffect } from 'react'
import styles from './spinButton.module.scss'

export const SpinButton = ({ onHoldDone, onHoldComplete, mustSpin, isSpeeningNow }) => {
	const timerRef = useRef(null)
	const hasCompletedRef = useRef(false)
	const intervalRef = useRef(null)
	const auto_spin_icon = require('../../assets/refresh.png')

	const handleMouseDown = () => {
		if (isSpeeningNow) return
		hasCompletedRef.current = false

		timerRef.current = setTimeout(() => {
			hasCompletedRef.current = true
			onHoldComplete()
			clearInterval(intervalRef.current)
		}, 2000)
	}

	const handleMouseUp = () => {
		// console.log('Отжато');
		if (isSpeeningNow) return
		clearTimeout(timerRef.current)
		clearInterval(intervalRef.current)
		onHoldDone()
	}

	useEffect(() => {
		return () => {
			clearTimeout(timerRef.current)
			clearInterval(intervalRef.current)
		}
	}, [])

	return (
		<div
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			onTouchStart={handleMouseDown}
			onTouchEnd={handleMouseUp}
			onContextMenu={(e) => e.preventDefault()}
			onDragStart={(e) => e.preventDefault()}
			onSelectStart={(e) => e.preventDefault()}
			onClick={(e) => e.preventDefault()}
			disabled={isSpeeningNow}
			style={{ opacity: isSpeeningNow ? 0.4 : 1 }}
			className={styles.container}
		>

			<div className={styles.container}>
				<div className={styles.container_inner}>
					<div className={styles.container_inner_title}>Крутить колесо</div>
					<div className={styles.container_inner_text}>
						<div>Удерживайте для автопрокрутки</div>
						<img src={auto_spin_icon} alt="auto_spin_icon" />
						
					</div>
				</div>
			</div>
		</div>
	)
}
