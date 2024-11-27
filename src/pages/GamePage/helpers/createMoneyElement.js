import { randomElementPosition } from "./randomElementPosition"
import { removeElement } from "./removeElement"
import { moveElement } from "./moveElement"
import styles from '../gamePage.module.scss'

const classList = [
    'green', 'red', 'orange'
]

export const createMoneyElement = (parentElement, elementFallingSpeed, handleClick) => { 
    const newDiv = document.createElement("div")
    newDiv.style.left = `${randomElementPosition()}%`
    parentElement.appendChild(newDiv)
    const randomClassIndex = Math.floor(Math.random() * 3);
    newDiv.classList.add(styles[classList[randomClassIndex]], styles.element);
    newDiv.addEventListener('click', (e) => {        
        removeElement(newDiv)    
        !newDiv.getAttribute('isClicked') && handleClick()         
        newDiv.setAttribute('isClicked', true)
    })
    moveElement(parentElement, newDiv, elementFallingSpeed)
}