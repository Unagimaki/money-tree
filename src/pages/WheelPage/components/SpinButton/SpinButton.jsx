import React, { useRef, useState, useEffect } from 'react'
import styles from './spinButton.module.scss'

export const SpinButton = ({ onHoldDone, onHoldComplete, mustSpin, isSpeeningNow }) => {
	const timerRef = useRef(null)
	const hasCompletedRef = useRef(false)
	const intervalRef = useRef(null)

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
		console.log('Отжато');
		
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
				</div>
			</div>
		</div>
	)
}
