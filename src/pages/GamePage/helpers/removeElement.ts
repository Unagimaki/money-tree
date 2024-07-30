export const removeElement = (elem: HTMLDivElement) => {
    elem.classList.add('smooth-end')
    setTimeout(() => elem.remove(), 600)
}