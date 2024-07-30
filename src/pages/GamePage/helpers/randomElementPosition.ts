export const randomElementPosition = (elem: HTMLDivElement, size: number) => {   
    const rect = elem.getBoundingClientRect()    
    return Math.random() * ((rect.left + (elem.offsetWidth - size)) - rect.left) + rect.left
} 