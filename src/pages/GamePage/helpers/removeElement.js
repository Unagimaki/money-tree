import styles from '../gamePage.module.scss'

export const removeElement = (elem) => {
    elem.classList.add(styles.smooth_end)
    setTimeout(() => elem.remove(), 600)
}