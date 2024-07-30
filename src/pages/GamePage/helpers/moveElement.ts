import { removeElement } from "./removeElement"

export const moveElement = (parentElement: HTMLDivElement, element: HTMLDivElement, elementFallingSpeed: number) => {
    const startTop = element.getBoundingClientRect().top
    let newTop = startTop
    setInterval(() => {
        newTop += 2
        element.style.top = newTop + 'px'
        element.getBoundingClientRect().top > parentElement.offsetHeight && removeElement(element)
    }, elementFallingSpeed)
}