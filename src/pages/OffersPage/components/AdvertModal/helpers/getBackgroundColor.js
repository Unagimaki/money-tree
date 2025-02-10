export const getBackgroundColor = (num) => {
    const red = Math.max(0, 255 - (num * 1.55));
    const green = Math.min(255, num * 1.55);
    return `rgb(${red}, ${green}, 0, 0.5)`; 
}