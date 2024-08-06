import { randomElementPosition } from "./randomElementPosition"
import { removeElement } from "./removeElement"
import { moveElement } from "./moveElement"
import { getCoins } from "../service/getCoins"
import styles from '../gamePage.module.scss'

const classList = [
    'green', 'red', 'orange'
]

export const createMoneyElement = (parentElement: HTMLDivElement, elementPixelSize: number, elementFallingSpeed: number) => {   
    const newDiv = document.createElement("div")
    newDiv.style.left = `${randomElementPosition()}%`
    parentElement.appendChild(newDiv)
    const randomClass = Math.floor(Math.random() * (2 - 0 + 1)) + 0
    newDiv.classList.add(styles[classList[randomClass]])
    newDiv.classList.add(styles.element)
    newDiv.addEventListener('click', () => {
        removeElement(newDiv)
        getCoins()
    })
    moveElement(parentElement, newDiv, elementFallingSpeed)
}