import styles from '../gamePage.module.scss'

export const removeElement = (elem: HTMLDivElement) => {
    elem.classList.add(styles.smooth_end)
    setTimeout(() => elem.remove(), 600)
}