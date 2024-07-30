import { randomElementPosition } from "./randomElementPosition"
import { removeElement } from "./removeElement"
import { moveElement } from "./moveElement"
import { getCoins } from "../getCoins"

export const createMoneyElement = (parentElement: HTMLDivElement, elementSizeViewport: number, elementPixelSize: number, elementFallingSpeed: number) => {   
    const newDiv = document.createElement("div")
    newDiv.style.left = `${randomElementPosition(parentElement, elementPixelSize)}px`
    newDiv.style.width = `${elementSizeViewport}vw`
    newDiv.style.height = `${elementSizeViewport}vw`
    parentElement.appendChild(newDiv)
    newDiv.classList.add('element')
    newDiv.addEventListener('click', () => {
        removeElement(newDiv)
        getCoins()
    })
    moveElement(parentElement, newDiv, elementFallingSpeed)
}